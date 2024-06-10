document.addEventListener('DOMContentLoaded', (event) => {
    // Empêcher le clic droit sauf sur les liens
    document.addEventListener('contextmenu', (event) => {
        if (event.target.nodeName !== 'A') {
            event.preventDefault();
        }
    });

    // Empêcher le glissement sur les images
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.ondragstart = () => false;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var images = document.querySelectorAll('.cover');
    var footerText = document.getElementById('footer-text');
    var footerButtons = document.getElementById('footer-buttons');

    

    var content = {
        "1": {
            text: [
                "<i>I'm Going</i> (2019) with flatheadstanley."
            ],
            links: [
                { url: "https://open.spotify.com/track/2BNXBvnLNPeUAy3u63EHCC?si=8b66f8913a674bdd", name: "Spotify" },
                { url: "https://music.apple.com/us/album/im-going/1476874986?i=1476874987", name: "Apple Music" },
                { url: "https://deezer.page.link/8WysUeifVu4jozdu6", name: "Deezer" },
                { url: "https://music.amazon.com/tracks/B07W4MHLTZ?marketplaceId=A13V1IB3VIYZZH&musicTerritory=FR&ref=dm_sh_tHORZvoh3pXdQGplZoQzoSnq2", name: "Amazon Music" },
                { url: "https://julienbramiami.bandcamp.com/track/im-going", name: "Bandcamp" },
                { url: "https://www.youtube.com/watch?v=8oxmycWMKgE", name: "YouTube" },
                { url: "https://music.youtube.com/watch?v=59baV2EqcyM", name: "YouTube Music" }
            ]
        },
        "2": {
            text: [
                "<i>Dance Fever</i> (2020) with flatheadstanley.",
            ],
            links: [
                { url: "https://open.spotify.com/track/0y7LGFEblxM0MrBXLqeJUT?si=8f0c295353a043e0", name: "Spotify" },
                { url: "https://music.apple.com/us/album/dance-fever/1502081808?i=1502081811", name: "Apple Music" },
                { url: "https://deezer.page.link/peCDYJaX1cat822h9", name: "Deezer" },
                { url: "https://music.amazon.com/tracks/B084WQSHX6?marketplaceId=A13V1IB3VIYZZH&musicTerritory=FR&ref=dm_sh_V72wTmZUHzGy4UN8JvBERvVYS", name: "Amazon Music" },
                { url: "https://julienbramiami.bandcamp.com/track/dance-fever", name: "Bandcamp" },
                { url: "https://www.youtube.com/watch?v=n10Phv5RlCE", name: "YouTube" },
                { url: "https://music.youtube.com/watch?v=B3lqMuNndYw", name: "YouTube Music" }
            ]
        },
        "3": {
            text: [
                "a playlist of JULIEN BRAMI certified music",
            ],
            links: [
                { url: "https://open.spotify.com/playlist/56pBfWLFqqXrq0BtwctcGd?si=c5d687827aac4354", name: "Spotify" },
                { url: "https://youtube.com/playlist?list=PLsoSAP84fvutexTWlI2ifOp9MYV66yaSd", name: "YouTube (audio only)" },
                { url: "https://youtube.com/playlist?list=PLsoSAP84fvusqwB1uYCHjWGz6cJK2miIJ", name: "YouTube (music videos)" },

                
            ]
        }
    };

    images.forEach(function (image) {
        image.addEventListener('click', function () {
            var key = image.getAttribute('data-text');
            var data = content[key];

            footerText.innerHTML = data.text.join('<br>');
            footerButtons.innerHTML = '';

            data.links.forEach(function (link) {
                var button = document.createElement('a');
                button.href = link.url;
                button.textContent = link.name;
                button.target = '_blank';
                footerButtons.appendChild(button);
            });
        });
    });

});


class LoopingElement {
    constructor(element, currentTranslation, speed, reverse = false) {
        this.element = element;
        this.currentTranslation = currentTranslation;
        this.speed = speed * 0.75; // Réduction de la vitesse de 25%
        this.direction = true;
        this.scrollTop = 0;
        this.metric = 100;
        this.reverse = reverse;

        this.lerp = {
            current: this.currentTranslation,
            target: this.currentTranslation,
            factor: 0.2,
        };

        this.events();
        this.render();
    }

    events() {
        window.addEventListener("scroll", (e) => {
            let direction = window.pageYOffset || document.documentElement.scrollTop;
            if (direction > this.scrollTop) {
                this.direction = true;
                this.lerp.target += this.speed * 10;
            } else {
                this.direction = false;
                this.lerp.target -= this.speed * 10;
            }
            this.scrollTop = direction <= 0 ? 0 : direction;
        });

        window.addEventListener("wheel", (e) => {
            if (e.deltaY > 0) {
                this.direction = true;
                this.lerp.target += this.speed * 10;
            } else {
                this.direction = false;
                this.lerp.target -= this.speed * 10;
            }
        });
    }

    lerpFunc(current, target, factor) {
        this.lerp.current = current * (1 - factor) + target * factor;
    }

    goForward() {
        this.lerp.target += this.speed;
        if (this.lerp.target > this.metric) {
            this.lerp.current -= this.metric * 2;
            this.lerp.target -= this.metric * 2;
        }
    }

    goBackward() {
        this.lerp.target -= this.speed;
        if (this.lerp.target < -this.metric) {
            this.lerp.current += this.metric * 2; // Correction ici
            this.lerp.target += this.metric * 2; // Correction ici
        }
    }

    animate() {
        if (this.reverse) {
            this.direction ? this.goBackward() : this.goForward();
        } else {
            this.direction ? this.goForward() : this.goBackward();
        }
        this.lerpFunc(this.lerp.current, this.lerp.target, this.lerp.factor);
        this.element.style.transform = `translateX(${this.lerp.current}%)`;
    }

    render() {
        this.animate();
        window.requestAnimationFrame(() => this.render());
    }
}

// Initialisation pour .item
let elements = document.querySelectorAll(".item");
new LoopingElement(elements[0], 0, 0.06); // Réduction de la vitesse
new LoopingElement(elements[1], -100, 0.06); // Réduction de la vitesse

// Initialisation pour .images-wrapper (si nécessaire, mais pas présent dans le HTML donné)
// let imagesArray = document.querySelectorAll(".images-wrapper");
// new LoopingElement(imagesArray[0], 0, 0.075); // Réduction de la vitesse
// new LoopingElement(imagesArray[1], -100, 0.075); // Réduction de la vitesse

// Initialisation pour .item2 en sens inverse
let elements2 = document.querySelectorAll(".item2");
new LoopingElement(elements2[0], 0, 0.06, true); // Réduction de la vitesse
new LoopingElement(elements2[1], -100, 0.06, true); // Réduction de la vitesse

// Initialisation pour .images-wrapper2 (si nécessaire, mais pas présent dans le HTML donné)
// let imagesArray2 = document.querySelectorAll(".images-wrapper2");
// new LoopingElement(imagesArray2[0], 0, 0.075, true); // Réduction de la vitesse
// new LoopingElement(imagesArray2[1], -100, 0.075, true); // Réduction de la vitesse
