import { Button, Divider, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Highlighter from "react-highlight-words";
import {book} from './book';

export default function Text() {

    const [isLiveRead, setIsLiveRead] = useState(false);
    const [text, setText] = useState('');
    const [searchWords, setSearchWords] = useState([]);

    var highlightIndex = 0;
    var wordsArr = [];

    useEffect(() => {
        wordsArr = book.split(' ');
        setText(book)

        document.addEventListener('keydown', function(e) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (highlightIndex > 0) {
                        highlightIndex -= 1;
                    }
                    updateSearchWords();
                    break;
    
                case 'ArrowRight':
                    highlightIndex += 1;
                    updateSearchWords();
                    break
            }
        });
    }, []);

    useEffect(() => {
        if (isLiveRead) {
            updateSearchWords();
        } else {
            clearSearchWords();
        }
    }, [isLiveRead]);

    const clearSearchWords = () => {
        setSearchWords([]);
    }

    const updateSearchWords = () => {
        setSearchWords([wordsArr.slice(0,highlightIndex).join(' ')]);
    }

    return (
        <div>

            <Button variant="contained" color="primary" style={{ marginBottom: '16px' }} onClick={() => {
                if (isLiveRead) {
                    setIsLiveRead(false);
                } else {
                    setIsLiveRead(true);
                }
            }}>
                { isLiveRead ? 'Stop Live Read' : 'Start Live Read' }
            </Button>

            <div/>

            <Highlighter
                searchWords={searchWords}
                autoEscape={true}
                textToHighlight={text}
                highlightStyle={{ whiteSpace: 'pre-wrap' }}
                unhighlightStyle={{ whiteSpace: 'pre-wrap' }}
            />
        </div>
    )

}