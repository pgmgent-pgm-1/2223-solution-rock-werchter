(() => {
  const app = {
    init() {
      console.log('1. Initialize Application');
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      console.log('2. Cache Elements');
      this.$lineup = document.querySelector('.lineup');
      this.$concertDetails = document.querySelector('.concert-details');
      this.$digitalClock = document.querySelector('.digital-clock');
    },
    generateUI() {
      console.log('3. Generate User Interface');
      this.$lineup.innerHTML = this.generateHTMLForLineup(lineup);
      const $concerts = this.$lineup.querySelectorAll('.concert');
      $concerts.forEach(($concert) => {
        $concert.addEventListener('click', (ev) => {
          const id = ev.currentTarget.dataset.id;
          this.generateUIForConcertDetails(id);
        });
      });
      this.clockInterval = setInterval(() => {
        this.updateDigitalClock();
      }, 500); 
    },
    generateHTMLForLineup(concerts) {
      let tmpStr = '';
      for (let i = 0; i < concerts.length; i++) {
        tmpStr += this.generateHTMLForConcert(concerts[i]);
      }
      return tmpStr;
    },
    generateHTMLForConcert(concert) {
      return `
      <div class="concert" data-id="${concert.id}">
        <h2 class="concert__band">${concert.band.name}</h2>
        <picture class="concert__picture">
          <img src="${concert.band.picture.small}">
        </picture>
        <div class="concert__meta">
          <span class="date__from">${new Date(concert.from).toDateString()}</span>
        </div>
      </div>
      `;
    },
    generateUIForConcertDetails(id) {
      const concert = lineup.find((concert) => concert.id === id);
      this.$concertDetails.innerHTML = this.generateHTMLForConcertDetails(concert);
    },
    generateHTMLForConcertDetails(concert) {
      console.log(concert);
      return `
      <div class="concert-details__left">
        <picture class="concert-details__picture">
          <img src="${concert.band.picture.small}">
        </picture>
      </div>
      <div class="concert-details__right">
        <div class="concert-details__meta">${new Date(concert.from).toDateString()}</div>
        <h1 class="concert-details__bandname">${concert.band.name}</h1>
        <ul class="socials__list">
          ${this.generateHTMLForSocials(concert.band.socials)}
        </ul>
        <p class="concert-details__synopsis">${concert.band.synopsis}</p>
        <div class="concert-details__media">
          ${this.generateHTMLForMedia(concert.band.media)}
        </div>
        <div class="concert-details__reviews">
          <h3 class="concert-details__reviews-title">Reviews</h3>
          <div class="concert-details__reviews-list">
            ${this.generateHTMLForReviews(concert.reviews)}
          </div>
        </div>
      </div>
      `;
    },
    generateHTMLForSocials(socials) {
      let tmpStr = '';
      for (let prop in socials) {
        tmpStr += `<li class="socials__list-item"><a href="${socials[prop]}" target="__blank" rel="noreferrer nofollow">${this.generateHTMLForSocialMediaIcon(prop)}</i><span>${prop}</span></a></li>`
      }
      return tmpStr;
    },
    generateHTMLForSocialMediaIcon(socialMedia) {
      switch (socialMedia) {
        case 'website': default: return '<i class="bi bi-globe">';
        case 'youtube':return '<i class="bi bi-youtube">';
        case 'spotify': return '<i class="bi bi-spotify">';
        case 'facebook': return '<i class="bi bi-facebook">';
        case 'instagram': return '<i class="bi bi-instagram">';
        case 'twitter': return '<i class="bi bi-twitter">';
      }
    },
    generateHTMLForMedia(media) {
      return media.map(medium => {
        let tmpStr = '';
        switch (medium.type) {
          case 'youtube': tmpStr = `
          <iframe width="100%" height="395" src="https://www.youtube.com/embed/${medium.link}" title="MUSE - Blockades [Official Music Video]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `; break;
          case 'image': default: tmpStr = `
          <picture class="concert-details__medium-picture">
            <img src="${medium.link}">
          </picture>
          `; break;
        }
        return tmpStr;
      }).join('');
      return tmpStr;
    },
    updateDigitalClock() {
      this.$digitalClock.innerHTML = new Date().toLocaleTimeString();
    },
    generateHTMLForReviews(reviews) {
      return reviews.map(review => {
        return `
        <div class="concert-details__reviews-list-item">
          <div class="review__meta">
            <span class="review__rating">${'🌟'.repeat(review.rating)}</span>
            <span class="review__date">${new Date(review.reviewedAt).toDateString()}</span>
          </div>
          <p class="review__comment">${review.comment}</p>
        </div>
        `;
      }).join('');
    }
  };
  app.init();
})();