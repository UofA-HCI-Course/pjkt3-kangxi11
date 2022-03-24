import { HelpOutline } from '@mui/icons-material';
import { Button, Divider, Typography, Grid, Icon, Tooltip } from '@mui/material';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import React, {useEffect, useState} from 'react';
import Highlighter from "react-highlight-words";
import {book} from './book';
import './Text.css';

export default function Text(props) {

    const [isLiveRead, setIsLiveRead] = useState(false);
    const [text, setText] = useState('');
    const [searchWords, setSearchWords] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

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
                default: break;
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleMouseUp = (e) => {
        const selection = window.getSelection();

        // Resets when the selection has a length of 0
        if (!selection || selection.anchorOffset === selection.focusOffset) {
            handleClose();
            return;
        }
    
        const getBoundingClientRect = () =>
            selection.getRangeAt(0).getBoundingClientRect();
    
        setOpen(true);
        setAnchorEl({
            getBoundingClientRect,
        });
    };

    const onBookmarkClicked = () => {
        props.setBookmarks(props.bookmarks.concat([window.getSelection().toString()]));
        handleClose();
    }

    const id = open ? "faked-reference-popper" : undefined;

    const findChunks = ({
        searchWords,
        textToHighlight
    }) => {
        const chunks = [];
        const textLow = textToHighlight.toLowerCase();
        
        // Add chunks for every searchWord
        searchWords.forEach(sw => {
            const swLow = sw.toLowerCase();

            const s = textLow.indexOf(swLow);
            chunks.push({
                start: s,
                end: s + swLow.length,
                highlight: true
            });
        });
        
        return chunks;
    };

    return (

        <Grid container direction="column" spacing={2}>
            <Grid item xs={1}>


                <Grid container direction="row" alignItems="center" spacing={1}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => {
                            if (isLiveRead) {
                                setIsLiveRead(false);
                            } else {
                                setIsLiveRead(true);
                            }
                        }}>
                            { isLiveRead ? 'Stop Live Read' : 'Start Live Read' }
                        </Button>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Live Read lets the document follow along as you read. Each word you read outloud, will be highlighted to help track your progress.">

                            <HelpOutline fontSize="small" />
                        </Tooltip>
                    </Grid>
                </Grid>
                
            </Grid>

            <Grid item xs className="text-right">
                <div onMouseLeave={handleClose}>
                    <Highlighter
                        searchWords={props.bookmarks.concat(searchWords)}
                        autoEscape={true}
                        textToHighlight={text}
                        highlightStyle={{ whiteSpace: 'pre-wrap' }}
                        unhighlightStyle={{ whiteSpace: 'pre-wrap' }}
                        onMouseUp={handleMouseUp}
                        findChunks={findChunks}
                    />
                    <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                        {({ TransitionProps }) => (
                            <Paper className="paper">
                                <MenuList className="list" autoFocus>
                                    <MenuItem onClick={handleClose}>Dictionary</MenuItem>
                                    <MenuItem onClick={handleClose}>Sticky Note</MenuItem>
                                    <MenuItem onClick={onBookmarkClicked}>Bookmark</MenuItem>
                                </MenuList>
                            </Paper>
                        )}
                    </Popper>
                </div>
            </Grid>

        </Grid>
    )

}