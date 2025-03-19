
      fetch("svg100.html")
        .then((response) => response.text())
        .then((data) => {
          const container = document.getElementById("svg-container");
          container.innerHTML = data;

          // Extract SVG from template
          const template = container.querySelector("#svg-template");
          if (!template) {
            console.error("SVG template not found.");
            return;
          }

          const svgContent = template.content.cloneNode(true);
          container.innerHTML = ""; // Clear template
          container.appendChild(svgContent);

          const svg = container.querySelector("svg");
          if (!svg) {
            console.error("SVG not found inside container.");
            return;
          }

          if (!svg.hasAttribute("viewBox")) {
            svg.setAttribute("viewBox", "0 0 800 600"); // Ensure viewBox is set
          }

          const popup = document.getElementById("popup");

          // Pan and Zoom functionality
          let isPanning = false;
          let startX, startY;

          svg.addEventListener("mousedown", (e) => {
            isPanning = true;
            startX = e.clientX;
            startY = e.clientY;
            svg.style.cursor = "grabbing";
          });

          window.addEventListener("mousemove", (e) => {
            if (!isPanning) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            svg.viewBox.baseVal.x -= dx / 2;
            svg.viewBox.baseVal.y -= dy / 2;
            startX = e.clientX;
            startY = e.clientY;
          });

          window.addEventListener("mouseup", () => {
            isPanning = false;
            svg.style.cursor = "grab";
          });

          svg.addEventListener("wheel", (e) => {
            e.preventDefault();
            const zoom = e.deltaY > 0 ? 1.1 : 0.9;
            svg.viewBox.baseVal.width *= zoom;
            svg.viewBox.baseVal.height *= zoom;
          });

          // Click events for showing popups
          svg.addEventListener("click", (event) => {
            const target = event.target.id;
            if (infoData[target]) {
              const data = infoData[target];
              popup.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.text}</p>
              `;
              popup.style.left = `${event.clientX + 1}px`;
              popup.style.top = `${event.clientY + 1}px`;
              popup.style.display = "block";
            } else {
              popup.style.display = "none";
            }
          });

          // Close popup when clicking outside
          document.addEventListener("click", (e) => {
            if (!e.target.closest("svg") && !e.target.closest(".popup")) {
              popup.style.display = "none";
            }
          });

          
          let floodLayersVisible = false; // Flood layers are off by default
          let layers = {
              rivers: true,
              cities: true,
              WDOP: false,
              ECO: false
          };
          
          // Function to toggle individual layers
          function changeState(layer) {
              layers[layer] = !layers[layer];
              toggleButton(`${layer}btn`, layers[layer]);
              render();
          }
          
          // Attach event listeners for individual layers
          document.getElementById("riversbtn").addEventListener("click", () => changeState("rivers"));
          document.getElementById("citiesbtn").addEventListener("click", () => changeState("cities"));
          document.getElementById("WDOPbtn").addEventListener("click", () => changeState("WDOP"));
          document.getElementById("ECObtn").addEventListener("click", () => changeState("ECO"));
          
          // Attach event listener for flood layers
          document.getElementById("toggleFloodBtn").addEventListener("click", () => {
              floodLayersVisible = !floodLayersVisible;
              toggleButton("toggleFloodBtn", floodLayersVisible);
              render();
          });
          
          // Function to update layer visibility
          function render() {
              Object.keys(layers).forEach(layer => {
                  document.getElementById(layer).style.display = layers[layer] ? "flex" : "none";
              });
          
              // Toggle flood layers as a group
              document.getElementById("overstroming_weinig").style.display = floodLayersVisible ? "flex" : "none";
              document.getElementById("overstroming5").style.display = floodLayersVisible ? "flex" : "none";
              document.getElementById("overstroming15").style.display = floodLayersVisible ? "flex" : "none";
          }
          
          // Toggle button colors
          function toggleButton(buttonId, isActive) {
              const button = document.getElementById(buttonId);
              if (isActive) {
                  button.classList.add("active");
              } else {
                  button.classList.remove("active");
              }
          }
          
          // Ensure flood layers are hidden on page load
          document.addEventListener("DOMContentLoaded", () => {
              document.getElementById("overstroming_weinig").style.display = "none";
              document.getElementById("overstroming5").style.display = "none";
              document.getElementById("overstroming15").style.display = "none";
          });
          
        })
        .catch((error) => console.error("Error loading SVG:", error));

      // Data for popups
      const infoData = {
        amsterdam: {
          title: "Amsterdam",
          text: "Capital city of the Netherlands, known for its canals and museums.",      
        },
        haarlem: {
          title: "Haarlem",
          text: "Historic city known for its art museums and medieval architecture.",
        },
        denhelder: {
            title: "Den Helder",
        },
        julianadorp: {
            title: "Julianadorp"
        },
        medemblik:{
            title: "Medemblik"
        },
        andijk: {
            title: "Andijk"
        },
        enkhuizen: {
            title: "Enkhuizen"
        },
        middenmeer:{
            title: "Middenmeer"
        
        },
        hoorn: {
            title: "Hoorn"
        },
        schoorl:{
            title: "Schoorl"            
        },
        bergen:{
            title:"Bergen"
        },
        heiloo:{
            title: "Heiloo"
        },
        schagen: {
            title: "Schagen"
        },
        opmeer: {
            title: "Opmeer"
        },
        egmond: {
            title: "Egmond"
        },
        purmerend:{
            title: "Purmerend"
        },
        volendam:{
            title: "Volendam"
        },
        ijmuiden:{
            title: "IJmuiden"
        },
        hoofddorp:{
            title: "Hoofddorp"
        },
        hilversum: {
            title: "Hilversum"
        },
        zandvoort: {
            title: "Zandvoort"
        },
        beverwijk: {
            title: "Beverwijk"
        },
        krommenie: {
          title: "Krommenie"
        },
        WDOP: {
          title: "WDO-Project"
        },
        WDOP: {
          title: "WDO-Project",
          text: "Hoofdbeheer bureau van het omliggende sluizen- en duinensysteem ",
        },
        alkmaarwaard:{
          title: "Alkmaar + Dijk en Waard"
        },
        ECO: {
          title: "Gemeentes met belang voor meer groen.",
          text: "Kijk 'Oplossingen' ->'Groen en Wateropslag'"
        },
        denburg: {
          title: "Den Burg"
        },
        cocksdorp: {
          title: "De Cocksdorp"
        },


        
      };

            
