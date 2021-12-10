import { ReactElement, useState } from "react";
import {
  Button,
  Modal,
  ModalProps,
  Paper,
  Step,
  Stepper,
  Typography,
  StepLabel,
  Box,
  Divider,
} from "@mui/material";
import JobPost from "../../interfaces/JobPost";
import ResumePage from "./pages/ResumePage";
import ReviewPage from "./pages/ReviewPage";
import Personal from "./pages/Personal";
import DescriptionPage from "./pages/DescriptionPage";
import { ReferralEmployee } from "./pages/Personal";
import axios from "axios";

interface ReferralCreationModalProps {
  jobPost: JobPost;
  closeModal: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  p: 4,
};

export default function ReferralCreationModal(
  props: ReferralCreationModalProps & Omit<ModalProps, "children">
) {
  const initialEmployeeData: ReferralEmployee = {
    id: null as string | null,
    name: "",
    email: "",
    phone: "",
  };

  const { jobPost, closeModal, ...modalProps } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [internal, setInternal] = useState<boolean>(false);
  const [employee, setEmployee] =
    useState<ReferralEmployee>(initialEmployeeData);
  const [description, setDescription] = useState("");
  const [resume, setResume] = useState<any>();

  const resetForm = () => {
    setActiveStep(0);
    setInternal(false);
    setEmployee(initialEmployeeData);
    setDescription("");
    setResume(null);
  };

  // Array of [label, component] pairs
  const steps: [string, ReactElement][] = [
    [
      "Personal",
      <Personal
        employee={employee}
        setEmployee={setEmployee}
        internal={internal}
        setInternal={setInternal}
      />,
    ],
    [
      "Recommendation",
      <DescriptionPage
        description={description}
        setDescription={setDescription}
      />,
    ],
    ["Documents", <ResumePage resume={resume} setResume={setResume} />],
    [
      "Review",
      <ReviewPage
        firstName={employee?.name.split(" ")[0]}
        lastName={employee?.name.split(" ")[1]}
        email={employee?.email}
        phone={employee?.phone}
        recommendation={description}
        resumeFilePath={resume?.name}
      />,
    ],
  ];

  const handleBack = () => {
    if (activeStep === 0) {
      closeModal();
      return;
    }
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) return handleSubmit();
    setActiveStep(activeStep + 1);
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "/referral",
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
      data: {
        resumeFileName: resume,
        employeeId: employee?.id,
        jobPostId: jobPost?.id,
        description: description,
        // pronoun
        email: employee?.email,
        phone: employee?.phone,
        firstName: employee?.name.split(" ")[0],
        lastName: employee?.name.split(" ")[1],
      },
    })
      .then((res) => {
        closeModal();
        resetForm();
      })
      .catch((e) => {
        // TODO
      });
  };

  return (
    <Modal onClose={closeModal} {...modalProps}>
      <Paper sx={style}>
        <Typography gutterBottom variant="h5">
          Referral for {jobPost?.title}
        </Typography>
        <Divider />
        <Box overflow="scroll" my={2} sx={{ height: "400px" }}>
          {steps[activeStep][1]}
        </Box>
        <Stepper activeStep={activeStep}>
          {steps.map(([label, _], i) => {
            return (
              <Step key={i}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box display="flex" justifyContent="space-evenly" mt={2}>
          <Button size="small" onClick={handleBack}>
            Back
          </Button>
          <Button size="small" variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
