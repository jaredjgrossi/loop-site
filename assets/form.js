// The waitlist form posts to Tally's own respond endpoint for form xVJzGG (the one its embed uses), so entries
// land in Tally like any other. Keys are the form's question ids; choices carry the option id.
(function () {
  var FORM_ID = "xVJzGG";
  var ENDPOINT = "https://api.tally.so/forms/" + FORM_ID + "/respond";
  var Q = {  // the questions' group ids from the form definition (tally.so/r/xVJzGG), as Tally's own page posts them
    email: "3c2f82b9-33b2-474c-914b-fc8bf92047d6",
    start: "aaa6c4e0-bf53-43ce-92ac-7a857d35148c",
    distance: "3bb3fc41-6203-4391-9a9b-ffc2cc999279",
    device: "d852f3b8-ae37-4a1a-a9a6-32bf467460ed",
    iphone: "f3746469-b53a-4b77-8b3c-58e576d0ceab",
    wants: "771cac43-74c2-4011-9002-39d22c73d899"
  };
  var form = document.getElementById("waitlist");
  var status = document.getElementById("status");
  var done = document.getElementById("done");
  var fallback = ' If it keeps failing, <a href="https://tally.so/r/' + FORM_ID + '">open the form on Tally</a>.';

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16);
    });
  }
  function picked(name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : null; }
  function say(text, isError) { status.innerHTML = text; status.classList.toggle("error", !!isError); }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var email = form.email.value.trim(), start = form.start.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say("An email address is the one thing the list needs.", true); form.email.focus(); return; }
    if (!start) { say("Where do you usually start? A neighborhood is enough.", true); form.start.focus(); return; }
    if (!picked("distance") || !picked("device") || !picked("iphone")) { say("Pick one in each row above.", true); return; }

    var responses = {};
    responses[Q.email] = email;
    responses[Q.start] = start;
    responses[Q.distance] = [picked("distance")];
    responses[Q.device] = [picked("device")];
    responses[Q.iphone] = [picked("iphone")];
    var wants = form.wants.value.trim();
    if (wants) responses[Q.wants] = wants;

    var button = form.querySelector("button");
    button.disabled = true; say("Sending…");
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionUuid: uuid(), respondentUuid: uuid(), responses: responses, captchas: {}, isCompleted: true, password: null })
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      form.hidden = true; done.hidden = false; done.focus && done.focus();
    }).catch(function () {
      button.disabled = false;
      say("That didn't send. Try again." + fallback, true);
    });
  });
})();
