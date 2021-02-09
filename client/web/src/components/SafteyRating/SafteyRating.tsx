import React from "react";

export {};
// import PropTypes from "prop-types";
// import Rating from "@material-ui/lab/Rating";
// import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
// import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
// import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

// import Box from "@material-ui/core/Box";

// const customIcons = {
//   1: {
//     icon: <SentimentVeryDissatisfiedIcon />,
//     label: "Very Dissatisfied",
//   },

//   2: {
//     icon: <SentimentSatisfiedIcon />,
//     label: "Neutral",
//   },

//   3: {
//     icon: <SentimentVerySatisfiedIcon />,
//     label: "Very Satisfied",
//   },
// };

// function IconContainer(props: IProps) {
//   const { value, ...other } = props;
//   return <span {...other}>{customIcons[value].icon}</span>;
// }

// IconContainer.propTypes = {
//   value: PropTypes.number.isRequired,
// };

// export default function SafteyRating() {
//   return (
//     <div>
//       <Box component="fieldset" mb={3} borderColor="transparent">
//         <Rating
//           name="customized-icons"
//           defaultValue={2}
//           getLabelText={(value: any) => customIcons[value].label}
//           IconContainerComponent={IconContainer}
//         />
//       </Box>
//     </div>
//   );
// }
