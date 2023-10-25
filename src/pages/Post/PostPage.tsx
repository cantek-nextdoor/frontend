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
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { createPostRequest } from "../../axios/post";
import { status } from "../../components/entities/status";
import { useUserStore } from "../../zustand/user";
import { tags } from "../../components/entities/tags";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = React.useState<string[]>([]);

  const userId = useUserStore((state) => state.uuid);

  const handleSelectChange = (event: SelectChangeEvent<typeof tagList>) => {
    const {
      target: { value },
    } = event;
    setTagList(typeof value === "string" ? value.split(",") : value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value); // Update content as a string
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // Update content as a string
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (description.length < 5 || title.length < 5) {
      window.alert("The title and content is less than 5 letter!.");
    } else {
      console.log("submit form!");

      const dataToSend = {
        userId,
        postId: uuidv4(),
        title,
        imageUrl: "string",
        description,
        tags: tagList,
        points: 0,
        numOfLike: 0,
        postedDate: new Date(),
        eventDate: new Date(),
        status: status.open,
        likedUserList: [],
      };

      createPostRequest(dataToSend);
    }
  };

  const today = dayjs();
  const tomorrow = dayjs().add(1,'day');



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
                  fontWeight: 700,
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
            <Grid container item xs={12} sm={2} style={{ height: "300px" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Content
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10} xl={15} style={{ height: "300px" }}>
              <TextareaAutosize
                required
                id="content"
                name="content"
                aria-label="content"
                placeholder="Type something..."
                minRows={3} // Specify the minimum number of rows
                maxRows={6} // Specify the maximum number of rows
                style={{
                  width: "100%",
                  height: "50%",
                  maxHeight: "250px",
                  maxWidth: "100%",
                  minWidth: "100%",
                  minHeight: "70%",
                }}
                value={description}
                onChange={handleContentChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
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
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
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
          {tags.map((tag) => (
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
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                sx={{ color: "#eee8e3", justifySelf: "center" }}
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </form>
  );
}
