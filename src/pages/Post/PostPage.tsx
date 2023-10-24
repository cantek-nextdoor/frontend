import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select"; 
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';


export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagList, setTagList] = React.useState<string[]>([]);
  // const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectChange = (event: SelectChangeEvent<typeof tagList>) => {
    const {
      target: { value },
    } = event;
    setTagList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value); // Update content as a string
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value); // Update content as a string
  };

  const handleSubmit = (event: React.FormEvent) => { 
    event.preventDefault();
    if (content.length <5 || title.length <5){
      window.alert('The title and content is less than 5 letter!.');
    } else {
    console.log("submit form!");

    const testBackEndUrl = "http://localhost:3000/post";

    const dataToSend = {
      userId: "05403fed-6047-447a-aa35-0be523d64783",
      postId: uuidv4(),
      title: title,
      imageUrl: "string",
      description: content,
      tags: tagList,
      points: '0',
      numOfLike: '0',
      postedDate: today,
      eventDate: tomorrow,
      status: "OPEN",
      likedUserList: []
    }

    fetch(testBackEndUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the response JSON if needed
        } else {
          throw new Error('Failed to send data to the backend');
        }
      })
      .then(responseData => {
        console.log("Insert response: ",responseData)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
    }

  }

  const today = dayjs();
  const tomorrow = dayjs().add(1,'day');

  const categories = [
    "seek help",
    "exchange stuff",
    "provide help",
    "activity",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Title
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid container item xs={12} sm={2} style={{ height: '300px' }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Content
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10} xl={15} style={{ height: '300px' }}>
              <TextareaAutosize
                required
                id="content"
                name="content"
                aria-label="content"
                placeholder="Type something..."
                minRows={3}  // Specify the minimum number of rows
                maxRows={6}  // Specify the maximum number of rows
                style={{ width: '100%' , height: '50%' , maxHeight: '250px' , maxWidth: '100%' , 
                minWidth: '100%', minHeight: '70%'}}
                value={content}
                onChange={handleContentChange}
              />
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select a start date"
                // value={selectedDate}
                // onChange={handleDateChange}
                defaultValue={today}
                minDate={today}
                disablePast
              />
              <DatePicker
                label="Select a due date"
                // value={selectedDate}
                // onChange={handleDateChange}
                defaultValue={tomorrow}
                minDate={tomorrow}
                disablePast
              />
            </LocalizationProvider>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Img Upload
              </InputLabel>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button>
                <UploadFileIcon />
              </Button>
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Category
              </InputLabel>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tagList}
          onChange={handleSelectChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {categories.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center'}}>
              <Button variant="contained" sx={{ color: "#eee8e3" ,  justifySelf: 'center'}} type="submit">
                Submit
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </form>
  );
}
