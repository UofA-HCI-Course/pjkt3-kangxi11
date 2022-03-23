import { Button, Divider, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import {sum_text} from './summary-text';


export default function Summary() {

    const [text, setText] = useState('');

    useEffect(() => {
        setText(sum_text);
    }, []);

    return (
        <div>
            <Typography variant="body">{text}</Typography>
        </div>
    )
}