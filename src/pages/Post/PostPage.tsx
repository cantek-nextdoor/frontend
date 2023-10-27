import * as React from "react";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import {createPostRequest} from "../../axios/post";
import {status} from "../../components/entities/status";
import {useUserStore} from "../../zustand/user";
import {tags} from "../../components/entities/tags";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AlertMui} from "../../ui-components/AlertMui.tsx";
import {useNavigate} from "react-router-dom";

export default function PostForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagList, setTagList] = React.useState<string[]>([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [category, setCategory] = useState('')

    const categories = [
        {label: 'Post', value: 'post'},
        {label: 'Activity', value: 'activity'},
        {label: 'Sale', value: 'sale'},
    ]

    const navigate = useNavigate();
    const userId = useUserStore((state) => state.uuid);
    const userPostalCode = useUserStore((state) => state.postalCode);

    const handleCategoryChange = (e: SelectChangeEvent) => {
        setCategory(e.target.value)
    }

    const handleSelectChange = (event: SelectChangeEvent<typeof tagList>) => {
        const {
            target: {value},
        } = event;
        setTagList(typeof value === "string" ? value.split(",") : value);
    };

    const handleAlertClose = () => {
        setIsAlertOpen(false)
    }

    const handleContentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(event.target.value); // Update content as a string
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value); // Update content as a string
    };

    const handleSubmit = async (event: React.FormEvent) => {
        try {

            event.preventDefault();
            if (description.length < 5 || title.length < 5) {
                window.alert("The title and content is less than 5 letter!.");
            } else {
                console.log("submit form!");

                const dataToSend = {
                    categories: category,
                    userId,
                    postId: uuidv4(),
                    title,
                    imageUrl: "string",
                    description,
                    tags: tagList,
                    points: 0,
                    numOfLike: 0,
                    postalCode: userPostalCode,
                    postedDate: new Date(),
                    eventDate: new Date(),
                    status: status.open,
                    likedUserList: [],
                };
                await createPostRequest(dataToSend);
            }
            setIsSuccess(true)
            setAlertMessage("Successfully created post!")
            navigate('/')
        } catch (e) {
            setIsSuccess(false)
            setAlertMessage("Cannot create post")
            console.log('Create Post error: ', e)
        } finally {
            setIsAlertOpen(true)
        }
    };

    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');


    return (
        <>
            <AlertMui severity={isSuccess ? 'success' : 'error'} handleAlertClose={handleAlertClose}
                      isAlertOpen={isAlertOpen} message={alertMessage}/>
            <form onSubmit={handleSubmit}>
                <Paper elevation={3} sx={{marginRight: "15%", marginLeft: "15%"}}>
                    <Box sx={{padding: 5}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
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

                            <Grid item xs={12} sm={9}>
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

                            <Grid item xs={12} sm={3}>
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
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    multiline
                                    rows={4}
                                    fullWidth
                                    required
                                    id="content"
                                    name="content"
                                    aria-label="content"
                                    placeholder="Type something..."
                                    value={description}
                                    onChange={handleContentChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
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

                            <Grid item xs={12} sm={9}>
                                <Select
                                    fullWidth
                                    labelId="post-category-label"
                                    id="post-category-select"
                                    value={category}
                                    onChange={handleCategoryChange}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.value} value={category.value}>
                                            {category.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                    }}
                                >
                                    Tags
                                </InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={tagList}
                                        onChange={handleSelectChange}
                                        input={
                                            <OutlinedInput id="select-multiple-chip" label="Chip"/>
                                        }
                                        renderValue={(selected) => (
                                            <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}/>
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {tags.map((tag) => (
                                            <MenuItem key={tag} value={tag}>
                                                {tag}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                    }}
                                >
                                    Event Date
                                </InputLabel>
                            </Grid>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid item xs={12} sm={4}>
                                    <DatePicker
                                        label="Select a start date"
                                        // value={selectedDate}
                                        // onChange={handleDateChange}
                                        defaultValue={today}
                                        minDate={today}
                                        disablePast
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <DatePicker
                                        label="Select a due date"
                                        // value={selectedDate}
                                        // onChange={handleDateChange}
                                        defaultValue={tomorrow}
                                        minDate={tomorrow}
                                        disablePast
                                    />
                                </Grid>
                            </LocalizationProvider>


                            <Grid
                                item
                                xs={12}
                                sm={12}
                                sx={{display: "flex", justifyContent: "end"}}
                            >
                                <Button
                                    variant="contained"
                                    sx={{color: "#eee8e3", justifySelf: "center"}}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </form>
        </>
    );

}
