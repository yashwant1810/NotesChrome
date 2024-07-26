document.addEventListener('DOMContentLoaded', () => {
    const textList = document.getElementById('textList');
  
    function renderSavedTexts() {
      chrome.storage.local.get({ savedTexts: [] }, (result) => {
        const savedTexts = result.savedTexts;
        textList.innerHTML = '';
        savedTexts.forEach((text, index) => {
          const li = document.createElement('li');
          li.textContent = text;
          
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.style.marginLeft = '10px';
          deleteButton.addEventListener('click', () => {
            savedTexts.splice(index, 1);
            chrome.storage.local.set({ savedTexts: savedTexts }, renderSavedTexts);
          });
  
          li.appendChild(deleteButton);
          textList.appendChild(li);
        });
      });
    }
  
    renderSavedTexts();
  });