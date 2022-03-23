import { Button, Divider, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';

export default function Glossary() {

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <div>
            {letters.map((letter) => (
                <div>
                    <Typography variant="h6">{letter}</Typography>
                    <Divider />
                    <div>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec euismod, nisi eu aliquam consectetur, nisl nisl
                            aliquet nisl, eu porttitor nisl nisl eu nisl.
                        </Typography>
                    </div>
                </div>
            ))}
        </div>
    )
}