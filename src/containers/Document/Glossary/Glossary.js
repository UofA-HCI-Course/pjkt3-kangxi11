import { Button, Divider, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';

import './Glossary.css';

export default function Glossary(props) {

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <div>
            {letters.map((letter) => (
                <div>
                    <Typography variant="h6">{letter}</Typography>
                    <Divider />
                    <div>
                        <Typography variant="body1" className="glossary-item" onClick={props.onClick}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </Typography>
                    </div>
                </div>
            ))}
        </div>
    )
}