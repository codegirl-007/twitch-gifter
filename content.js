function watchTwitchChat() {
  
  const chatContainer = document.querySelector('[data-a-target="chat-scroller"]');

  if (!chatContainer) {
    console.log("Twitch chat not found. Retrying in 1 second...");
    setTimeout(watchTwitchChat, 1000);
    return;
  }

  console.log("[!codegirl] Twitch chat found! Monitoring messages...");
  
  
  // Observer to detect new messages
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const messageElement = node.querySelector('[data-a-target="chat-line-message"]');

            if (messageElement) {

              const user = messageElement.getAttribute('data-a-user');
              console.log(`[!codegirl] username: ${user}`);
              const text = messageElement.querySelector('[data-a-target="chat-message-text"]').textContent ?? '';

              if (messageElement && text.includes("sucking nut milks involves sucking on nuts.") && user === 'nightbot') {
                console.log(`[!codegirl] !codegirl found: "${text} by "${user}"`);
                clickGiftSubscription()
              }

              const cheers = text.match(/cheer[0-9]+/) || [];
              const hasCheers = cheers.length > 0;
              if (messageElement && text.includes("!codegirl") && hasCheers) {
                clickGiftSubscription()
              }
            }
          }
      });
    });
  });

  // Start observing chat container
  observer.observe(chatContainer, {
    childList: true,
    subtree: true
  });
}

function clickGiftSubscription() {
  console.log("[!codegirl] Attempting to gift a subscription...");

  // Find the "Gift a Sub" button
  const giftSubButton = document.querySelector('[data-a-target="gift-button"]');
  
  if (!giftSubButton) {
    console.log("[!codegirl] Gift a Sub button not found. Make sure you're logged in and on a channel with gifting enabled.");
    return;
  }

  giftSubButton.click();
  console.log("[!codegirl] Clicked the 'Gift a Sub' button.");

  setTimeout(function() {
    const singleGiftSubButton = document.querySelector('[data-a-target="gift-button-oneclick-1"]');

    if (!singleGiftSubButton) {
      console.log('[!codegirl] can\'t find the single gifted sub button');
    }

    singleGiftSubButton.click();
    console.log('[!codegirl] clicked single gifted sub button');
  }, 2000);

  

  setTimeout(function() {
    payNowButton = document.querySelector('[data-a-target="one-click-checkout-pay-button"] button')

    if (payNowButton) {
      //payNowButton.click()
      console.log('[!codegirl] final button clicked!')
      return;
    }
  }, 2000);
}



// Start watching chat once the content script is loaded
watchTwitchChat();
