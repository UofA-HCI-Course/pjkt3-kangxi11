import { HelpOutline } from '@mui/icons-material';
import { Button, Divider, Typography, Grid, Icon, Tooltip } from '@mui/material';
import Popper from '@mui/material/Popper';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

    const [dictionaryOpen, setDictionaryOpen] = useState(false);
    const [dictionaryAnchorEl, setDictionaryAnchorEl] = useState(null);

    const [stickyNoteOpen, setStickNoteOpen] = useState(false);
    const [stickyNotePos, setStickyNotePos] = useState({});
    const [stickyNoteAnchorEl, setStickNoteAnchorEl] = useState(null);

    let stickyNotesText = "";
    const [stickyNotes, setStickyNotes] = useState([]);
    const [showAllStickyNotes, setShowAllStickyNotes] = useState(false);
    const [showAllStickyNotesAnchor, setShowAllStickyNotesAnchor] = useState(null);

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

    const handleCloseBothPoppers = () => {
        setOpen(false);
        setDictionaryOpen(false);
    }

    const handleDictionaryClose = () => {
        setDictionaryOpen(false);
    }

    const handleStickyNoteClose = () => {
        setStickNoteOpen(false);
    }

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

    const onDictionaryClicked = () => {
        const selection = window.getSelection();
        handleClose();
    
        const getBoundingClientRect = () =>
            selection.getRangeAt(0).getBoundingClientRect();
    
        setDictionaryOpen(true);
        setDictionaryAnchorEl({
            getBoundingClientRect,
        });
    }

    const onStickyNoteClicked = () => {
        const selection = window.getSelection();
        handleClose();
        const getBoundingClientRect = () =>
            selection.getRangeAt(0).getBoundingClientRect();

        setStickNoteOpen(true);
        setStickNoteAnchorEl({
            getBoundingClientRect,
        });
        setStickyNotePos(selection);
    }

    const stickyNoteTextChanged = (e) => {
        stickyNotesText = e.target.value;
    }

    const onStickyNoteSaveClicked = () => {
        setStickyNotes(stickyNotes.concat([{
            text: stickyNotesText,
        }]));

        handleStickyNoteClose();
    }

    const handleStickyNoteToggle = (e) => {
        setShowAllStickyNotes(!showAllStickyNotes);
        setShowAllStickyNotesAnchor(e.currentTarget);
    }

    const handleAllStickyNoteClose = () => {
        setShowAllStickyNotesAnchor(null);
    };    

    const id = open ? "menu-popper" : undefined;
    const dictionary_id = dictionaryOpen ? "dictionary-popper" : undefined;
    const sticky_id = stickyNoteOpen ? "sticky-popper" : undefined;

    const allStickyNotesOpen = Boolean(showAllStickyNotes);
    const all_stick_id = allStickyNotesOpen ? 'all-sticky-popover' : undefined;
  

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
                <Button className="sticky-note-button" variant="contained" onClick={handleStickyNoteToggle}>Toggle Sticky Notes</Button>
            </Grid>

            <Grid item xs className="text-right">
                <div onMouseLeave={handleCloseBothPoppers}>
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
                                    <MenuItem onClick={onDictionaryClicked}>Dictionary</MenuItem>
                                    <MenuItem onClick={onStickyNoteClicked}>Sticky Note</MenuItem>
                                    <MenuItem onClick={onBookmarkClicked}>Bookmark</MenuItem>
                                </MenuList>
                            </Paper>
                        )}
                    </Popper>
                    <Popper id={dictionary_id} open={dictionaryOpen} anchorEl={dictionaryAnchorEl} onMouseLeave={handleDictionaryClose}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                            <h4>Definition:</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            <h4>Insights</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </Box>
                    </Popper>
                    <Popper id={sticky_id} open={stickyNoteOpen} anchorEl={stickyNoteAnchorEl} onMouseLeave={handleStickyNoteClose}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                            <TextField
                                id="standard-multiline-static"
                                label="Sticky Note"
                                multiline
                                rows={4}
                                variant="standard"
                                onChange={stickyNoteTextChanged}
                            />
                            <br></br>
                            <Button variant="contained" size="small" onClick={onStickyNoteSaveClicked}>Save</Button>
                        </Box>
                    </Popper>
                    <Popper
                        id={all_stick_id}
                        open={allStickyNotesOpen}
                        anchorEl={showAllStickyNotesAnchor}
                        onClose={handleAllStickyNoteClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                            {
                                stickyNotes.length === 0 
                                ? <p>No Sticky Notes</p>
                                : stickyNotes.map( (d, i) => {
                                    return (<div>
                                        <h4>Sticky Note {i+1}</h4>
                                        <p>{d.text}</p>
                                    </div>);
                                })
                            }
                        </Box>
                    </Popper>
                </div>
            </Grid>

        </Grid>
    )

}