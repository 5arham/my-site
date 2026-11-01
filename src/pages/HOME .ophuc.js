// Play details popup.
// Each "Read More" button opens the #playDetailsModal embed (see embed/play-details.html)
// and tells it which play to show.
//
// Set each `button` below to the ID of that play's Read More button in the Wix editor
// (select the button > the ID is shown in the Properties & Events panel).

const PLAYS = [
    { playId: 'bhagavadajjukam', button: '#readMoreBhagavadajjukam' },
    { playId: 'ilhaam', button: '#readMoreIlhaam' },
    { playId: 'rashomon', button: '#readMoreRashomon' }
];

const MODAL = '#playDetailsModal';

$w.onReady(function () {
    const modal = $w(MODAL);
    let pendingPlay = null;

    modal.hide();

    // The embed hasn't always loaded by the time a hidden element is shown,
    // so it announces "ready" and we re-send the open request if one is waiting.
    modal.onMessage((event) => {
        const message = event.data || {};
        if (message.type === 'close') {
            pendingPlay = null;
            modal.hide('fade');
        } else if (message.type === 'ready' && pendingPlay) {
            modal.postMessage({ type: 'open', playId: pendingPlay });
        }
    });

    PLAYS.forEach(({ playId, button }) => {
        let el;
        try {
            el = $w(button);
        } catch (e) {
            console.error(`Play details: no element found for ${button}. Update its ID in HOME page code.`);
            return;
        }
        el.onClick(() => {
            pendingPlay = playId;
            modal.show('fade');
            modal.postMessage({ type: 'open', playId });
        });
    });
});
