import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';


export interface BookCardProps {
    loading?: boolean
    title?: string
    subheader?: string
    imgSrc?: string
    imgAlt?: string
  }

const BookCard: React.FC<BookCardProps> = (
    {loading = false, title='', subheader='', imgSrc='', imgAlt=''}
    :BookCardProps,) => {

        const maxTitleLength = 20;
        const handleFavoriteClick = () => {};

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            title={title.length < maxTitleLength ? title : `${title.slice(0, maxTitleLength)}...`}
            subheader={subheader.length < maxTitleLength ? subheader : `${subheader.slice(0, maxTitleLength)}...`}
        />
        <CardMedia
            component="img"
            height="194"
            image={imgSrc}
            alt={imgAlt}
        />
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
            <FavoriteIcon />
            </IconButton>
        </CardActions>
        </Card>
    );
};

export default BookCard;