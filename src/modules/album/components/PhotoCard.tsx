import { Col, Image, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { Photo } from '../../../model/model.ts';
import useStore from '../../../store.ts';
import { Draggable } from 'react-drag-reorder';
import DeletePhotoButton from './buttons/DeletePhotoButton.tsx';
import ReplacePhotoButton from './buttons/ReplacePhotoButton.tsx';

const PhotoCard = () => {
    const { setPhotos, photos, filteredPhotos } = useStore();

    const renderOverlay = (props: object, photo: Photo) => (
        <Popover {...props}>
            <Popover.Header as="h3">{photo.title}</Popover.Header>
            <Popover.Body>
                <Row className='justify-content-center'>
                    <Image src={photo.url} className='photo' />
                </Row>
                <Row className='justify-content-center'>
                    <DeletePhotoButton photo={photo} />
                    <ReplacePhotoButton photo={photo} />
                </Row>
            </Popover.Body>
        </Popover>
    );

    const getChangedPos = (currentPos: number, newPos: number) => {
        const [removedItem] = photos.splice(currentPos, 1);
        photos.splice(newPos, 0, removedItem);
        setPhotos(photos);
    };

    return (
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
};

export default PhotoCard;
