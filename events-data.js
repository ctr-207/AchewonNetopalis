/* ============================================================================
   LODGE EVENTS. This is the ONLY place you need to edit to add, change,
   or remove an event. Both the homepage and the Events page read from this
   same list automatically, so you never have to edit two places.

   HOW TO ADD AN EVENT:
   Copy one of the { ... } blocks below, paste it in as a new one, and
   change the four values. Save the file. Done.

     date         the event's date, written as 'YYYY-MM-DD'
                  (year, then month, then day, always 2 digits for month/day)
                  Example: September 12, 2026  ->  '2026-09-12'
     title        the event's name, in quotes
     location     where it's happening, in quotes
     description  a sentence or two about it, in quotes (shown when someone
                  clicks the event)
     link         OPTIONAL. A URL for a button on the event's popup (sign-up
                  form, registration page, study guide, etc). Leave this out
                  entirely if the event doesn't need one.
     linkLabel    OPTIONAL, only used alongside link. The button's text.
                  Leave it out and the button just says "Register".

   You do NOT need to remove old events. Any event whose date has already
   passed automatically disappears from the site the next day.
   You do NOT need to sort this list. Events always display soonest-first.
   You do NOT need to decide what shows where. The homepage always shows
   the next 3 upcoming events, and the Events page always shows the next 6.
   ============================================================================ */

/* Empty for now, on purpose. Add your first real event below whenever you have one.
   Example of what an entry looks like (copy this shape, then delete the // in front
   of each line and fill in your own details):

   {
     date: '2026-09-12',
     title: 'Fall Ordeal Weekend',
     location: 'Camp Seton',
     description: 'New member induction and cheerful service.'
   }
*/
const LODGE_EVENTS = [
  {
    date: '2026-09-20',
    title: 'COC',
    location: 'Doucette Scout Leadership Center, 544 Broadway, Massapequa, NY 11758',
    description: 'Sunday, September 20, 11am–2pm, at Scouting America Long Island Council headquarters.'
  },
  {
    date: '2026-10-17',
    title: 'Camporee',
    location: 'Camp Seton',
    description: 'A day of camporee activities at Camp Seton, including a campfire run by OA.'
  },
  {
    date: '2026-10-24',
    title: 'OA Campout',
    location: 'Pound Ridge Alpine Scout Camp, 441 US-9W, Alpine, NJ 07620',
    description: 'A lodge campout weekend, October 24–25.',
    link: 'https://www.signupgenius.com/go/20F0D4AAAAF28A5FDC34-65981369-oapound#/'
  },
  {
    date: '2026-12-04',
    title: 'SWFT',
    location: 'Alpine Scout Camp, 441 US-9W, Alpine, NJ 07620',
    description: 'Section Winter Fellowship & Training, December 4–6. A winter weekend with the rest of Section E18, with games, bonding, and short workshops on OA roles and Conclave planning.'
  },
  {
    date: '2027-01-30',
    title: 'Klondike Derby',
    location: 'Camp Seton',
    description: 'Klondike Derby at Seton with an overnight stay, January 30–31, including a campfire run by OA.'
  }
];

/* Link to the lodge's public Google Calendar. Once you've made the
   calendar public and copied its link, paste it in between the quotes
   below, replacing the #. */
const GOOGLE_CALENDAR_URL = 'https://calendar.google.com/calendar/u/0?cid=YW5ldG9wYWxpc2xvZGdlQGdtYWlsLmNvbQ';


/* ============================================================================
   Nothing below this line needs to be touched to add, change, or remove
   an event. This is just the code that turns the list above into the
   tiles and popups you see on the page.
   ============================================================================ */

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatShortDate(dateStr) {
  const parts = dateStr.split('-').map(Number);
  return MONTH_NAMES[parts[1] - 1] + ' ' + parts[2];
}

function formatLongDate(dateStr) {
  const parts = dateStr.split('-').map(Number);
  return MONTH_NAMES[parts[1] - 1] + ' ' + parts[2] + ', ' + parts[0];
}

/* Returns the next `count` events that have not happened yet, soonest first.
   window.__devForceNoEvents is only used by the temporary test button. */
function getUpcomingEvents(count) {
  if (window.__devForceNoEvents) return [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return LODGE_EVENTS
    .filter(function (e) {
      const p = e.date.split('-').map(Number);
      const eventDate = new Date(p[0], p[1] - 1, p[2]);
      return eventDate >= today;
    })
    .sort(function (a, b) { return a.date.localeCompare(b.date); })
    .slice(0, count);
}

/* A small faded, blocky sad face shown when there are no upcoming events. */
const SAD_FACE_SVG =
  '<svg width="64" height="64" viewBox="0 0 5 5" shape-rendering="crispEdges" style="opacity:0.3;">' +
  '<rect x="1" y="1" width="1" height="1" fill="currentColor"/>' +
  '<rect x="3" y="1" width="1" height="1" fill="currentColor"/>' +
  '<rect x="0" y="3" width="1" height="1" fill="currentColor"/>' +
  '<rect x="4" y="3" width="1" height="1" fill="currentColor"/>' +
  '<rect x="1" y="4" width="1" height="1" fill="currentColor"/>' +
  '<rect x="2" y="4" width="1" height="1" fill="currentColor"/>' +
  '<rect x="3" y="4" width="1" height="1" fill="currentColor"/>' +
  '</svg>';

/* Fills a grid container with event tiles (or the "no events" message).
   containerId: the id of the empty <div class="grid ..."> to fill.
   count: how many upcoming events to show (3 on the homepage, 6 on the Events page). */
function renderEventTiles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const events = getUpcomingEvents(count);

  if (events.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'col-span-full flex flex-col items-center justify-center text-center py-12';
    empty.style.color = 'var(--forest-soft)';
    empty.innerHTML = SAD_FACE_SVG +
      '<p class="mt-4 font-semibold" style="color:var(--forest);">No upcoming events right now</p>' +
      '<p class="text-sm mt-1" style="color:#7d765c;">Check back soon, or view the full calendar below.</p>';
    container.appendChild(empty);
    return;
  }

  events.forEach(function (e, i) {
    const tile = document.createElement('div');
    tile.className = 'note-tile ' + (i % 2 === 0 ? 'tilt-l' : 'tilt-r');
    tile.setAttribute('role', 'button');
    tile.setAttribute('tabindex', '0');
    tile.innerHTML =
      '<div class="note-pin"></div>' +
      '<p class="note-date mb-2">' + formatShortDate(e.date) + '</p>' +
      '<h3 class="font-bold" style="color:var(--forest);">' + e.title + '</h3>' +
      '<p class="text-sm mt-1" style="color:#7d765c;">' + e.location + '</p>';
    tile.addEventListener('click', function () {
      openEventModal(e.title, formatLongDate(e.date), e.location, e.description, e.link, e.linkLabel);
    });
    tile.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter' || evt.key === ' ') { evt.preventDefault(); tile.click(); }
    });
    container.appendChild(tile);
  });
}

/* Shared popup logic, used by every page that shows event tiles. */
function openEventModal(title, date, location, desc, link, linkLabel) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-date').textContent = date;
  document.getElementById('modal-location').textContent = location;
  document.getElementById('modal-desc').textContent = desc;
  const linkEl = document.getElementById('modal-link');
  if (linkEl) {
    if (link) {
      linkEl.href = link;
      linkEl.textContent = linkLabel || 'Register';
      linkEl.hidden = false;
    } else {
      linkEl.hidden = true;
    }
  }
  document.getElementById('event-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeEventModal() {
  document.getElementById('event-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOnBackdrop(e) {
  if (e.target.id === 'event-modal') closeEventModal();
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeEventModal();
});
