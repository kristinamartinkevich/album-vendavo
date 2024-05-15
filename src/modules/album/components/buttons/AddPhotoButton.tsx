
import { useParams } from 'react-router-dom';
import useStore from '../../../../store';
import { uploadPhoto } from '../../../../utils/apiService';
import { Photo } from '../../../../model/model';

function AddPhotoButton() {
    const { albumId } = useParams();
    const { setPhotos, setFile, photos } = useStore();

    async function addPhoto(e) {
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        const response = await uploadPhoto(fileUrl);
        const newPhoto: Photo = {
            albumId: Number(albumId),
            id: response.id,
            title: 'foo',
            url: response.url,
            thumbnailUrl: response.url,
        }
        const newPhotos = [...photos as Photo[], newPhoto];
        setPhotos(newPhotos);
        setFile(fileUrl);
    }

    return (
        <input type="file" onChange={addPhoto} />
    );
};

export default AddPhotoButton;
