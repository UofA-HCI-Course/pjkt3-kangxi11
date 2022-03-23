import { Button, Divider, Grid, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';

import './Glossary.css';

export default function Glossary(props) {

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (

        <Grid container spacing={{ xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12}}>
            {letters.map((letter, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Typography variant="h6">{letter}</Typography>
                    <Divider />
                    <div>
                        <Typography variant="body1" className="glossary-item" onClick={props.onClick}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit 
                        </Typography>
                    </div>
                </Grid>
            ))}
        </Grid>
    )
}