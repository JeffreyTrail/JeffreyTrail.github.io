import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Modal,
  Typography
} from "@mui/material";
import * as React from "react";
// import ticket_sample from "../public/ticket_sample.png";

function Ticketing() {
  const [code, setCode] = React.useState("");
  const [sid, setSid] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  const [wings, setWings] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [result, setResult] = React.useState(-1);
  const [errmsg, setErrmsg] = React.useState("");

  const handleSid = (e) => {
    setSid(e.target.value)
  };

  const lookup = () => {
    const url =
      "https://wings-carrier.herokuapp.com/submit/" +
      teacher +
      "/" +
      wings +
      "/" +
      sid +
      "/" +
      code;

    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.rcode);
        setErrmsg(data.msg);
      });
  };

  const submit = () => {
    setSubmitted(true);
    if (code !== "" && sid !== "" && teacher !== "" && wings !== "") {
      try {
        lookup();
      } catch {
        setResult(-2);
        setErrmsg(
          "Hmm looks like there is something wrong with the server; maybe it's busy. Try again later. If this persists, please let Mr. Gu know."
        );
      }
    }
  };

  return (
    <React.Fragment>
      <Modal open={result !== -1} onClose={() => setResult(-1)}>
        {result === 0 ? (
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Submission Accepted
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your WINGS ticket submission has been submitted. Thank you for
              exhibiting WINGS! Pay attention to ASB announcements this week to
              see if you've won!
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Keep up the good work! Click away to submit another ticket.
            </Typography>
          </Box>
        ) : (
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Invalid Ticket Submission
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {errmsg}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              If you believe you received the error above is a mistake with the
              system, please bring your ticket to Mr. Gu in G4, or email him at &nbsp 
              <a href="mailto:rangu@iusd.org">rangu@iusd.org</a>. Thanks!
            </Typography>
          </Box>
        )}
      </Modal>

      {/**************** Begin Submission Form****************/}
      <Box component="form" sx={{
        margin: "auto",
        // width: "50%",
        display: "flex",
        flexDirection: "column"
      }}>
        <Typography variant="h5" sx={rowStyle} >
          Submit your WINGS ticket
        </Typography>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={{width:"39%"}}>
            What is the 9 digit code at the top of your WINGS ticket?
          </Typography>
          <TextField
            required
            error={submitted && code === ""}
            label="Ticket Code"
            defaultValue="XXX-XXX-XXX"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{width:"60%"}}
          />
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={{width:"39%"}}>
            Which WINGS letter did you demonstrate?
          </Typography>

          <FormControl sx={{width:"60%"}}>
            <RadioGroup
              aria-labelledby="wings-choice"
              defaultValue=""
              error={submitted && wings === ""}
              name="wings-choice"
              value={wings}
              onChange={(event) => {setWings(event.target.value)}}
            >
              <FormControlLabel
                value="w"
                control={<Radio />}
                label="Willing to take a risk"
              />
              <FormControlLabel
                value="i"
                control={<Radio />}
                label="Integrity in action"
              />
              <FormControlLabel
                value="n"
                control={<Radio />}
                label="Nobility in thought"
              />
              <FormControlLabel
                value="g"
                control={<Radio />}
                label="Generous in spirit"
              />
              <FormControlLabel
                value="s"
                control={<Radio />}
                label="Self-directed"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={{width:"39%"}}>Who issued you the ticket?</Typography>
          <Autocomplete
            id="teacher-select"
            value={teacher}
            forcePopupIcon={false}
            onChange={(event, newValue) => {
              setTeacher(newValue.label);
            }}
            options={staff}
            sx={{width:"60%"}}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                error={submitted && teacher === ""}
                label="Teacher Name"
              />
            )}
          />
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={{width:"39%"}}>What is your IUSD student ID?</Typography>
          <TextField
            error={submitted && sid === ""}
            required
            label="IUSD student ID"
            defaultValue=""
            value={sid}
            onChange={handleSid}
            sx={{width:"60%"}}
          />
        </Box>

        <Button onClick={submit} fullWidth={true} sx={rowStyle} variant="contained">
          submit
        </Button>
      </Box>

      {/*
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 10
        }}
      >
        <Typography variant="h6">Sample Ticket</Typography>
        <img src={ticket_sample} alt="sample WINGS ticket" />
      </Box>
      */}
    </React.Fragment>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
};

const staff = [
  { label: "ANGEL" },
  { label: "LELLIOTT" },
  { label: "BOSSHART" },
  { label: "WARE" },
  { label: "HALL" },
  { label: "VREELAND" },
  { label: "SURJONO" },
  { label: "BEEMAN" },
  { label: "MASCIEL" },
  { label: "PATTON" },
  { label: "ALLEN" },
  { label: "HOUGH" },
  { label: "FLEMING" },
  { label: "GARCIA" },
  { label: "HARRISON" },
  { label: "MELGOZA" },
  { label: "CLAPPER" },
  { label: "DI FRANCESCO" },
  { label: "FORD" },
  { label: "IGNACIO" },
  { label: "JONG" },
  { label: "TATERI" },
  { label: "SHIMAMOTO" },
  { label: "LEAVEY" },
  { label: "LAMPERT" },
  { label: "LEVENSAILOR" },
  { label: "PATRICK" },
  { label: "SOLIDAY" },
  { label: "PIPP" },
  { label: "BARCENAS" },
  { label: "CETINELIAN" },
  { label: "HONG" },
  { label: "PENG" },
  { label: "BABE" },
  { label: "COLLINS" },
  { label: "GEORGINO" },
  { label: "TRAPP" },
  { label: "KUBO" },
  { label: "GU" },
  { label: "RAU" },
  { label: "REYNGOLD" },
  { label: "MONTGOMERY" },
  { label: "SEILHAN" },
  { label: "BIRCHLER" },
  { label: "EISMAN" },
  { label: "BUTLER" },
  { label: "KAHELIN" },
  { label: "ADAMS" },
  { label: "MUNOZ" },
  { label: "BYRNE" },
  { label: "NGUYEN" }
];

export default Ticketing;
