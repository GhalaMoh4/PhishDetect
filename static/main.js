

        // Get the result from the machine learning model
        // const result = "Phishing";

        // Get the result element
        const resultElement = document.getElementById("result");
        
        // Update the class of the result element based on the result
        if (result === "Safe") {
          resultElement.textContent = "Safe";
          resultElement.classList.add("safe");
        } else if (result === "Phishing") {
          resultElement.textContent = "Phishing";
          resultElement.classList.add("phishing");
        } 
        
                 function calculateUrlLength(text) {
          const urlRegex = /(https?:\/\/|ftp:\/\/|mailto:\/\/)[^\s]+/g;
          const match = urlRegex.exec(text);
          if (match) {
            return match[0].length;
          }
          return 0;
        
        }
        
        
              function analyze() {
                // Extract the text from the text area element
                const text = document.getElementById("inputTextArea").value;
              
                // Count the number of dots
                const dotCount = (text.match(/\./g) || []).length;
                document.getElementById("dotCount").innerText = "Number of Dots: " + dotCount;
                document.getElementById("dotCountValue").value = dotCount;

                 // Count the number of urlLength
                const urlLength = calculateUrlLength(text);
                document.getElementById("urlLength").innerText = "URL Length: " + urlLength;
                document.getElementById("urlLengthValue").value = urlLength;

                 // Count the number of dashes
                const dashCount = (text.match(/-/g) || []).length;
                document.getElementById("dashCount").innerText = "Number of Dashes: " + dashCount;
                document.getElementById("dashCountValue").value = dashCount;
        
                // Count the number of numeric characters
                  const numericCharCount = (text.match(/[0-9]/g) || []).length;
                  document.getElementById("numericCharCount").innerText =  "Number of numeric characters: " + numericCharCount;
                  document.getElementById("numericCharCountValue").value = numericCharCount;


                  // Count the number of sensitive words
                  const sensitiveWords = ['password', 'credit card', 'social security', 'ssn', 'bank account', 'pin'];
                  let sensitiveWordCount = 0;
                  for (let i = 0; i < sensitiveWords.length; i++) {
                      const sensitiveWord = sensitiveWords[i];
                      const regex = new RegExp(sensitiveWord, 'gi');
                      const matchCount = (text.match(regex) || []).length;
                      sensitiveWordCount += matchCount;
                  }
                  document.getElementById("sensitiveWordCount").innerText = "Number of sensitive words: " + sensitiveWordCount;
                  document.getElementById("sensitiveWordCountValue").value = sensitiveWordCount;


                  // Check if the email contains insecure forms
            const hasInsecureForms = text.match(/<form.*action=["'](http:|ftp:|mailto:|tel:)/i) !== null ? 1 : 0; 
            document.getElementById("hasInsecureForms").innerText =  " contains insecure forms: " + hasInsecureForms;
            document.getElementById("hasInsecureFormsValue").value = hasInsecureForms;


                // Calculate the subdomain level of the first URL found in the text
                 const subdomainLevel = calculateSubdomainLevel(text);
                document.getElementById("subdomainLevel").innerText = "Subdomain Level: " + subdomainLevel;
                document.getElementById("subdomainLevelValue").value = subdomainLevel;
               
               
                // Count the number of @ symbols
                const atSymbolCount = (text.match(/@/g) || []).length ? 1 : 0;
                document.getElementById("atSymbolCount").innerText = "Number of @ symbols: " + atSymbolCount;
                document.getElementById("atSymbolCountValue").value = atSymbolCount; 
        
                // Count the number of tildes
                  const tildeCount = (text.match(/~/g) || []).length ? 1 : 0;
                  document.getElementById("tildeCount").innerText =  "Number of tilde Symbols: " + tildeCount;
                  document.getElementById("tildeCountValue").value = tildeCount;
                
                  // Count the number of underscores
                  const underscoreCount = (text.match(/_/g) || []).length;
                  document.getElementById("underscoreCount").innerText = "Number of underscores: " + underscoreCount;
                  document.getElementById("underscoreCountValue").value = underscoreCount;
                
                  // Count the number of percent signs
                  const percentCount = (text.match(/%/g) || []).length;
                  document.getElementById("percentCount").innerText =  "Number of percent signs: " +  percentCount;
                  document.getElementById("percentCountValue").value = percentCount;
                
                  // Count the number of ampersands
                  const ampersandCount = (text.match(/&/g) || []).length;
                  document.getElementById("ampersandCount").innerText = "Number of ampersands: " +  ampersandCount;
                  document.getElementById("ampersandCountValue").value = ampersandCount;
                
                  // Count the number of hashes
                  const hashCount = (text.match(/#/g) || []).length ? 1 : 0;
                  document.getElementById("hashCount").innerText =  "Number of hashe tags: " +  hashCount;
                  document.getElementById("hashCountValue").value = hashCount;
                
                  
                
                  // Check if the URL contains HTTPS
                  const hasHttps = text.includes("https://") ? 1 : 0;
                  document.getElementById("hasHttps").innerText =  "contains HTTPS: " + hasHttps;
                  document.getElementById("hasHttpsValue").value = hasHttps;
                
                  // Check if the URL contains a random string
                  const hasRandomString = text.match(/[a-zA-Z0-9]{10}/g) !== null ? 1 : 0; 
                  document.getElementById("hasRandomString").innerText =  "email contains random string: " + hasRandomString;
                  document.getElementById("hasRandomStringValue").value = hasRandomString;
                
                  
        
                     // Check if the email contains external links 
                  const hasExternalLinks = text.includes("<a href=") ? 1 : 0; 
                  document.getElementById("hasExternalLinks").innerText =  " contains external links: " + hasExternalLinks;
                  document.getElementById("hasExternalLinksValue").value = hasExternalLinks;
             
                 
          
            // Check if the email contains abnormal form actions
            const hasAbnormalFormAction = text.match(/<form.*action=["'](http:|https:|ftp:|javascript:|data:)/i) !== null ? 1 : 0; 
            document.getElementById("hasAbnormalFormAction").innerText = " contains abnormal form actions: " + hasAbnormalFormAction;
            document.getElementById("hasAbnormalFormActionValue").value = hasAbnormalFormAction;
        
                    // Check if each email message has a title or not
            
              const hasMissingTitle = text.match(/^(?:Dear.*|Hello.*|Hi.*|Greetings.*|From.*)\s*(.*)$/mi) !== null ? 1 : 0; 
              document.getElementById("hasMissingTitle").innerText =  "Contains Missing Title: " + hasMissingTitle;
              document.getElementById("hasMissingTitleValue").value = hasMissingTitle;
        
        
            
              }

              
  function calculateSubdomainLevel(text) {
          const urlRegex = /(https?:\/\/|ftp:\/\/|mailto:\/\/)[^\s]+/g;
          const match = urlRegex.exec(text);
          if (match) {
            const url = new URL(match[0]);
            const domain = url.hostname;
            const dotCount1 = (domain.match(/\./g) || []).length;
            return dotCount1;
          }
          return 0;
        }

// Make a POST request to the server
fetch("/predict", {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify({ text })
})
  .then(response => response.json())
  .then(data => {
      // Get the result from the machine learning model
      const result = data.result;
      // Show the result in the front end
      document.getElementById('result').innerHTML = result;
  }
  );
  
