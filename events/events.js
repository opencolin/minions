/**
 * Agentic Engineering — Events Map
 * Renders a chronological list of upcoming events alongside a world map.
 */

(function () {
  'use strict';

  // ── Tile layer (NASA VIIRS City Lights — dark) ──
  var TILE_URL =
    'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg';
  var TILE_ATTR =
    'Imagery © <a href="https://earthdata.nasa.gov">NASA EOSDIS GIBS</a>';

  // ── Helpers ──
  function parseDate(s) {
    // Accept YYYY-MM-DD; treat as UTC noon so timezone shifts don't roll back a day.
    var parts = s.split('-');
    return new Date(
      Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0)
    );
  }

  function formatDate(s) {
    var d = parseDate(s);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear();
  }

  function formatDateRange(start, end) {
    if (!end || end === start) return formatDate(start);
    var s = parseDate(start);
    var e = parseDate(end);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (s.getUTCFullYear() === e.getUTCFullYear() && s.getUTCMonth() === e.getUTCMonth()) {
      return months[s.getUTCMonth()] + ' ' + s.getUTCDate() + '–' + e.getUTCDate() + ', ' + s.getUTCFullYear();
    }
    return formatDate(start) + ' – ' + formatDate(end);
  }

  function todayUTC() {
    var n = new Date();
    return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()));
  }

  // ── Init map ──
  function initMap() {
    var map = L.map('events-map', {
      center: [25, 10],
      zoom: 2,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      worldCopyJump: true,
      minZoom: 2,
      maxZoom: 8,
    });

    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTR,
      maxNativeZoom: 8,
      maxZoom: 8,
    }).addTo(map);

    L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    return map;
  }

  // ── Build dot icon ──
  function makeDotIcon(isFlagship) {
    var size = isFlagship ? 12 : 8;
    return L.divIcon({
      className: 'event-dot' + (isFlagship ? ' flagship' : ''),
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }

  // ── Render sidebar list ──
  function renderList(events, listEl, countEl, onSelect) {
    listEl.innerHTML = '';

    if (!events.length) {
      var empty = document.createElement('li');
      empty.className = 'events-empty';
      empty.textContent = 'No upcoming events. Check back soon.';
      listEl.appendChild(empty);
      countEl.textContent = '0 upcoming';
      return;
    }

    countEl.textContent = events.length + ' upcoming';

    events.forEach(function (ev, idx) {
      var li = document.createElement('li');
      li.className = 'event-item';
      li.dataset.slug = ev.slug;
      li.setAttribute('role', 'listitem');
      li.setAttribute('tabindex', '0');

      var dateRow = document.createElement('div');
      dateRow.className = 'event-item-date';
      dateRow.textContent = formatDateRange(ev.date, ev.endDate);
      if (ev.flagship) {
        var tag = document.createElement('span');
        tag.className = 'flagship-tag';
        tag.textContent = 'Flagship';
        dateRow.appendChild(tag);
      }
      li.appendChild(dateRow);

      var title = document.createElement('div');
      title.className = 'event-item-title';
      title.textContent = ev.title;
      li.appendChild(title);

      var loc = document.createElement('div');
      loc.className = 'event-item-location';
      loc.textContent = ev.location || ev.city || 'Online';
      li.appendChild(loc);

      if (ev.description) {
        var desc = document.createElement('div');
        desc.className = 'event-item-desc';
        desc.textContent = ev.description;
        li.appendChild(desc);
      }

      var actions = document.createElement('div');
      actions.className = 'event-item-actions';

      if (ev.url) {
        var detailsBtn = document.createElement('a');
        detailsBtn.className = 'event-details-btn';
        detailsBtn.href = ev.url;
        detailsBtn.target = '_blank';
        detailsBtn.rel = 'noopener';
        detailsBtn.textContent = 'Details →';
        detailsBtn.addEventListener('click', function (e) { e.stopPropagation(); });
        actions.appendChild(detailsBtn);
      }

      if (ev.sponsor === 'nebius') {
        var sponsorTag = document.createElement('span');
        sponsorTag.className = 'event-sponsor-tag';
        sponsorTag.textContent = 'Nebius';
        actions.appendChild(sponsorTag);
      }

      if (actions.children.length) li.appendChild(actions);

      li.addEventListener('click', function () { onSelect(ev, li); });
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(ev, li);
        }
      });

      listEl.appendChild(li);
    });
  }

  // ── Place markers ──
  function placeMarkers(events, map) {
    var markers = {};

    events.forEach(function (ev) {
      if (!ev.lat || !ev.lng) return;

      var marker = L.marker([ev.lat, ev.lng], {
        icon: makeDotIcon(ev.flagship),
      });

      var tipHtml =
        '<strong>' + (ev.title || '') + '</strong>' +
        '<span class="tip-meta">' +
        (ev.location || ev.city || '') +
        ' · ' + formatDateRange(ev.date, ev.endDate) +
        '</span>';

      marker.bindTooltip(tipHtml, {
        className: 'event-tooltip',
        direction: 'top',
        offset: [0, -8],
      });

      marker.on('add', function () {
        var el = this.getElement();
        if (el) el.style.setProperty('--breathe-delay', (Math.random() * 4).toFixed(1) + 's');
      });

      marker.addTo(map);
      markers[ev.slug] = marker;
    });

    return markers;
  }

  // ── Main ──
  document.addEventListener('DOMContentLoaded', function () {
    var listEl = document.getElementById('events-list');
    var countEl = document.getElementById('events-count');

    var map = initMap();

    fetch('./events.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var today = todayUTC();

        // Filter: keep events whose end date (or start if no end) is today or later
        var upcoming = (data.events || []).filter(function (ev) {
          var ref = parseDate(ev.endDate || ev.date);
          return ref >= today;
        });

        // Sort by start date ascending
        upcoming.sort(function (a, b) {
          return parseDate(a.date) - parseDate(b.date);
        });

        var markers = placeMarkers(upcoming, map);
        var activeSlug = null;

        function selectEvent(ev, liEl) {
          // Update list UI
          Array.prototype.forEach.call(listEl.querySelectorAll('.event-item'), function (el) {
            el.classList.remove('active');
          });
          if (liEl) liEl.classList.add('active');

          // Update map
          if (activeSlug && markers[activeSlug]) {
            var prev = markers[activeSlug].getElement();
            if (prev) prev.classList.remove('active');
          }
          activeSlug = ev.slug;

          var marker = markers[ev.slug];
          if (marker) {
            var el = marker.getElement();
            if (el) el.classList.add('active');
            map.flyTo([ev.lat, ev.lng], Math.max(map.getZoom(), 4), { duration: 0.6 });
            marker.openTooltip();
          }
        }

        renderList(upcoming, listEl, countEl, selectEvent);

        // Click a marker → highlight its list item
        Object.keys(markers).forEach(function (slug) {
          markers[slug].on('click', function () {
            var li = listEl.querySelector('.event-item[data-slug="' + slug + '"]');
            if (li) {
              li.scrollIntoView({ behavior: 'smooth', block: 'center' });
              li.classList.add('active');
              if (activeSlug && activeSlug !== slug) {
                var prevLi = listEl.querySelector('.event-item[data-slug="' + activeSlug + '"]');
                if (prevLi) prevLi.classList.remove('active');
              }
              activeSlug = slug;
            }
          });
        });
      })
      .catch(function (err) {
        listEl.innerHTML = '<li class="events-empty">Couldn\'t load events. <br>(' + err.message + ')</li>';
        countEl.textContent = '';
      });

    // Sidebar toggle (mobile)
    var sidebarToggle = document.querySelector('.sidebar-toggle');
    var sidebar = document.querySelector('.events-sidebar');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function () {
        var opened = sidebar.classList.toggle('open');
        sidebarToggle.setAttribute('aria-expanded', String(opened));
      });
    }
  });
})();
