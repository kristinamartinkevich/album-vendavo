import { Button, Col, Container, Image, OverlayTrigger, Popover, Row, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { Photo } from '../../../model/model.ts';
import { useParams } from 'react-router-dom';
import GoBackButton from '../../common/components/GoBackButton.tsx';
import { deletePhoto, fetchPhotos, replacePhoto, uploadPhoto } from '../../../utils/apiService.tsx';
import useStore from '../../../store';
import { Draggable } from 'react-drag-reorder';

function Album() {
    const { albumId } = useParams();
    const { setPhotos, setFile, photos, searchTerm, setSearchTerm, filteredPhotos, setFilteredPhotos } = useStore();

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

    async function replacePicture(e, photoId) {
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        const newPhoto = await replacePhoto(photoId, fileUrl);
        if (newPhoto) {
            const updatedPhotos = photos.map(photo =>
                photo.id === photoId
                    ? { ...photo, url: newPhoto.url, thumbnailUrl: newPhoto.url }
                    : photo
            );
            setPhotos(updatedPhotos);
        }
    }

    async function deletePicture(photoId: string) {
        const response = await deletePhoto(photoId)
        if (!response && photos) {
            const newPhotos = photos.filter(photo => photo.id !== photoId)
            setPhotos(newPhotos);
        }
    }

    const renderOverlay = (props: object, photo: Photo) => (
        <Popover {...props}>
            <Popover.Header as="h3">{photo.title}</Popover.Header>
            <Popover.Body>
                <Row className='justify-content-center'>
                    <Image src={photo.url} className='photo' />
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => deletePicture(photo.id)}>Delete</Button>
                    </Col>
                    <Col>
                        <input type="file" onChange={(e) => replacePicture(e, photo.id)} />
                    </Col>
                </Row>
            </Popover.Body>
        </Popover>
    );

    useEffect(() => {
        if (albumId) {
            fetchPhotos(albumId)
                .then(album => { setPhotos(album); setFilteredPhotos(album) });
        }
    }, [albumId]);

    const getChangedPos = (currentPos: number, newPos: number) => {
        const [removedItem] = photos.splice(currentPos, 1);
        photos.splice(newPos, 0, removedItem);
        setPhotos(photos);
    };

    function handleChange(term) {
        setSearchTerm(term);
        setFilteredPhotos(photos.filter(photo =>
            photo.title.toLowerCase().includes(term.toLowerCase())
        ));
        console.log(filteredPhotos)
    };

    const renderPhotos = () => (
        <Draggable onPosChange={getChangedPos}>
            {filteredPhotos.map((photo: Photo) => (
                <Col key={photo?.id}>
                    <OverlayTrigger trigger="click"
                        overlay={(props) => renderOverlay(props, photo)}>
                        <span>
                            <Image src={photo?.thumbnailUrl} thumbnail />
                            <div className='text-truncate title'>{photo?.title}</div>
                        </span>
                    </OverlayTrigger>
                </Col>
            ))}
        </Draggable>
    );

    return (
        <Container>
            <GoBackButton />
            <Row>
                <Col>
                    <input
                        type="text"
                        placeholder="Search by album title"
                        value={searchTerm}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                {photos ? renderPhotos() : <Spinner animation="border" />}
            </Row>
            <Row>
                <input type="file" onChange={addPhoto} />
            </Row>
        </Container>
    );
};

export default Album;
