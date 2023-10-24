import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select"; 
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export default function PostForm() {
  const [tag, setTag] = useState<"" | { value: string }>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [selectedDate, setSelectedDate] = useState(null);

  // const handleDateChange = (date: Date) => {
  //   setSelectedDate(date);
  // };

  const handleSelectChange = (
    event: SelectChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setTag(event.target.value as "" | { value: string });
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

    // const data = {
    //   userId: "05403fed-6047-447a-aa35-0be523d64783",
    //   // postId: string;
    //   // title: string;
    //   // imageUrl: string;
    //   // description: string;
    //   // tags: string[];
    //   // points: number;
    //   // userId: string;
    //   // numOfLike: number;
    //   postedDate: new Date(),
    //   eventDate: new Date(),
    //   status: "OPEN",
    //   likedUserList: [],
    // }
    
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
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tag}
                  label="Tag"
                  onChange={handleSelectChange}
                > 
                  {categories.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
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
