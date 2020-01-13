import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = props => {

    const results = props.data;
    let photos;
    if (results.length > 0) {
        photos = results.map(photo => <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`} key={photo.id}/>); 
    } else {
        photos = <NotFound />
    }

    return(
        <ul>
            {photos}
        </ul>
    );
}

export default PhotoList;