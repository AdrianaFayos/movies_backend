const axios = require('axios');

class Movies {

    async findTopRated() {

        let res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1');
        return res.data;

    }

    async findUpcoming() {

        let res = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1');
        return res.data;

    }

    async findPopular() {

        let res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1');
        return res.data;

    }

    async findMoviesById(id) {
        
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US`);
        return res.data;

    }

    async findMoviesByTitle(title) {

        let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&query=${title}`);
        return res.data;

    }

    async Genre(name) {
        
        let genreArray = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US');

        let newArray = genreArray.data.genres;

        for (let i = 0 ; i < newArray.length ; i++) {

            if (newArray[i].name.toLowerCase()  == name.toLowerCase() ){
                let id = newArray[i].id;
                let res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&with_genres=${id}`);
                return res.data;
            }
        }         
     }

    async findByActor(name) {
        let res = await axios.get(`http://api.themoviedb.org/3/search/person?query=${name}&api_key=210d6a5dd3f16419ce349c9f1b200d6d`);
        return res.data;
    }

    async playTrailer(movieId){
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US`)
        let trailer = "https://www.youtube.com/watch?v=" + res.data.results[0].key;
    
        return trailer;
    }

}

let moviesController = new Movies();

module.exports = moviesController;