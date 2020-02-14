import React from 'react';
import { act, render, cleanup } from '@testing-library/react';
import axios from 'axios';
import uuid from 'uuid/v4';
import GifGenerator from './git-generator.component';

function Gif({ title, imageURL }) {
  return {
    id: uuid(),
    images: {
      fixed_width: {
        url: imageURL
      }
    },
    title
  };
}

const stubbedGifs = [
  Gif({
    title: 'Sad Gif',
    imageURL: '//media2.giphy.com/media/sad.gif'
  }),
  Gif({
    title: 'Funny Gif',
    imageURL: '//media2.giphy.com/media/funny.gif'
  }),
  Gif({
    title: 'Animated GIF',
    imageURL: '//media2.giphy.com/media/animated.gif'
  })
];

beforeEach(() => {
  axios.get = jest.fn(() => Promise.resolve({ data: { data: stubbedGifs } }));
});

afterEach(cleanup);

describe('GifGenerator', () => {
  it('displays text "…Loading" while fetching gifs', async () => {
    await act(async () => {
      const { getByText } = render(<GifGenerator />);

      getByText('...Loading');
    });
  });

  it('removes text "…Loading" after displaying gifs', async () => {
    const { getByText } = render(<GifGenerator />);

    await waitForElementToBeRemoved(() => getByText('…Loading'));
  });

  it('displays the trending gifs received from Giphy API', async () => {
    const { getByAltText } = render(<GifGenerator />);

    await waitForElement(() => getByAltText(stubbedGifs[0].title));
    getByAltText(stubbedGifs[1].title);
    getByAltText(stubbedGifs[2].title);
  });
});
