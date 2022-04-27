function preloadSummerImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];

    seasons.forEach((season) => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/gallery/${season}/${i}.jpg`;
        }
    })
}

export default preloadSummerImages;