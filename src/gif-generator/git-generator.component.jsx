import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function useGiphyAPI() {
  const [gifs, setGifs] = useState(null);

  useEffect(() => {
    let isStopped = false;

    if (!isStopped) {
      const getGifs = async () => {
        try {
          const {data: { data: gifs }} = 
          await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=3`);
            console.log(gifs)
          if (!isStopped && gifs) {
            setGifs(gifs);
          }
        } catch (error) {
          console.error(error);
        }
      };

      getGifs();
    }
    return () => {
      isStopped = true;
    };
  }, []);

  return [gifs]
}

const GifGenerator = () => {
    const [gifs] = useGiphyAPI()

  return <Fragment>
    {
        gifs ? gifs.map(gif => (
        <img
            key={gif.id}
            src={gif.images.fixed_width.url}
            alt={gif.title}
        />
        )) : <p>…Loading</p>
    }
  </Fragment>;
};

export default GifGenerator;
