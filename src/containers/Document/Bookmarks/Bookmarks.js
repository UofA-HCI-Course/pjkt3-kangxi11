import { Button, Divider, Grid, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';

import './Bookmarks.css';

export default function Bookmarks(props) {

    return (
        <div>
            {props.bookmarks.map((bookmark, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Typography variant="h6">{index+1}. Page 1</Typography>
                    <Divider />
                    <div>
                        <Typography variant="body1" className="bookmarks-item" onClick={props.onClick}>
                            {bookmark} 
                        </Typography>
                    </div>
                </Grid>
            ))}
        </div>
    )
}