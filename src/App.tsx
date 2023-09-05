import React, {useState, useEffect} from 'react';
import './App.css';

/**
 * Represents the possible gender values.
 *
 * @typedef {('M' | 'F' | 'Other')} GenderProps
 * @description
 * Use this type to define the gender of a person. It can be one of the following values:
 * - 'M': Male
 * - 'F': Female
 * - 'Other': Other or unspecified gender
 *
 * @example
 * // Usage example:
 * const userGender: GenderProps = 'M';
 */
type GenderProps = 'M' | 'F' | 'Other';

/**
 * Represents the properties required for displaying an alert or notification in a React component.
 * @typedef {object} AlertProps
 * @property {boolean} showAlert - Determines whether the alert should be displayed or not.
 * @property {string} alertMessage - The message or content that should be displayed within the alert.
 */
type AlertProps = {
    showAlert: boolean;
    alertMessage: string;
}

/**
 * Represents properties for a car.
 *
 * @typedef {object} CarProps
 * @property {number | null} age - The age of the car.
 * @property {string | null} hasLicense - Indicates whether the car has a license.
 * @property {string | null} isFirstCar - Indicates whether this is the first car.
 * @property {string | null} drivetrainOption - The drivetrain option of the car.
 * @property {string | null} isWorriedFuelEmissions - Indicates if the owner is worried about fuel emissions.
 * @property {number | null} carNumber - The car number.
 * @property {string} make - The make (manufacturer) of the car.
 * @property {string} model - The model of the car.
 */
type CarProps = {
    age: number | null;
    hasLicense: string | null;
    isFirstCar: string | null;
    drivetrainOption: string | null;
    isWorriedFuelEmissions: string | null;
    carNumber: number | null;
    make: string;
    model: string;
};


function App() {
    /* These lines of code are initializing state variables using the `useState` hook in React. */
    const [age, setAge] = useState<number | null>(null);
    const [gender, setGender] = useState<GenderProps | ''>('');
    const [hasLicense, setHasLicense] = useState<string | null>(null);
    const [isFirstCar, setIsFirstCar] = useState<string | null>(null);
    const [drivetrainOption, setDrivetrainOption] = useState<string | null>(null);
    const [isWorriedFuelEmissions, setWorriedFuelEmissions] = useState<string | null>(null);
    const [surveyComplete, setSurveyComplete] = useState<boolean>(false);
    const [carNumber, setCarNumber] = useState<number>(0);
    const [step, setStep] = useState(1);

    const [alert, setAlert] = useState<AlertProps>({showAlert: false, alertMessage: ''});

    const [surveyData, setSurveyData] = useState<CarProps[]>([]); // Initialize survey data state

    // List of the five most popular car makes
    const popularCarMakes = ["BMW", "Toyota", "Honda", "Ford", "Chevrolet"];
    // Render car inputs for Question 8
    const carInputs = [];

    // State to store car make and model for each car
    const [carInfoList, setCarInfoList] = useState(
        new Array(carNumber).fill({make: "", model: ""})
    );

    const handleNext = () => {
        if (step === 1) {
            // Move from step 1 (Question 7) to step 2 (Question 8)
            setStep(2);
        }
    };

    const [showResult, setShowResult] = useState<boolean>(false);

    // Define state variables to store survey results
    const [adolescents, setAdolescents] = useState(0);
    const [unlicensed, setUnlicensed] = useState(0);
    const [firstTimers, setFirstTimers] = useState(0);
    const [targetables, setTargetables] = useState(0);
    const [targetablesWithFuelEmissions, setTargetablesWithFuelEmissions] = useState(0);
    const [targetablesWithFwdOrIdk, setTargetablesWithFwdOrIdk] = useState(0);
    const [totalCarsInFamily, setTotalCarsInFamily] = useState(0);
    const [percentageAdolescents, setPercentageAdolescents] = useState(0);
    const [percentageUnlicensed, setPercentageUnlicensed] = useState(0);
    const [percentageFirstTimers, setPercentageFirstTimers] = useState(0);
    const [percentageTargetables, setPercentageTargetables] = useState(0);
    const [percentageFuelEmissionsCare, setPercentageFuelEmissionsCare] = useState(0);
    const [percentageFwdOrUnknownDrivetrain, setPercentageFwdOrUnknownDrivetrain] = useState(0);
    const [averageCarsInFamily, setAverageCarsInFamily] = useState(0);

    /**
     * Render a list of car input fields based on the number of cars (carNumber) and their associated data (carInfoList).
     *
     * @param {number} carNumber - The number of cars to render input fields for.
     * @param {Array} carInfoList - An array of car information objects.
     * @param {Function} handleCarMakeChange - A callback function to handle changes in the car make.
     * @param {Function} handleCarModelChange - A callback function to handle changes in the car model.
     * @param {Array} popularCarMakes - An array of popular car makes to populate the dropdown options.
     * @returns {Array} An array of React components representing car input fields.
     */
    for (let i = 0; i < carNumber; i++) {
        const carInfo = carInfoList[i] || {make: "", model: ""}; // Provide a default value if carInfoList[i] doesn't exist

        carInputs.push(
            <div key={i}>
                <h3>Car {i + 1}:</h3>
                <label>
                    Car Make:
                    <select
                        value={carInfo.make}
                        onChange={(e) => handleCarMakeChange(i, e.target.value)}
                    >
                        <option value="">Select a make</option>
                        {popularCarMakes.map((make, index) => (
                            <option key={index} value={make}>
                                {make}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Model Name:
                    <input
                        type="text"
                        value={carInfo.model}
                        onChange={(e) => handleCarModelChange(i, e.target.value)}
                        placeholder="Enter model name"
                    />
                </label>
            </div>
        );
    }

    /**
     * Handles the blur event of an age input field in a form.
     *
     * Parses the input value to an integer and updates the 'age' state if it's a valid integer.
     * Additionally, displays an alert if the entered age is less than 18.
     * It also updates and saves the survey data using the 'updateAndSaveSurvey' function.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleAgeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ageValue = parseInt(e.target.value);
        if (!isNaN(ageValue)) {
            setAge(ageValue);
        }

        if (ageValue !== null && ageValue < 18) {
            updateAndSaveSurvey();
            setAlert({showAlert: true, alertMessage: 'Thank you for your interest, but you are under 18.'});
        }
    };

    /**
     * Handles the change event of an age input field in a form.
     *
     * Parses the input value to an integer and updates the 'age' state if it's a valid integer.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ageValue = parseInt(e.target.value);
        if (!isNaN(ageValue)) {
            setAge(ageValue);
        }
    };

    /**
     * Handles the change event of a gender select input field in a form.
     *
     * Updates the 'gender' state with the selected gender value if it's one of the specified values ('M', 'F', or 'Other').
     * Logs an error if an invalid gender value is selected.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} e - The event object representing the select input change.
     */
    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        if (selectedValue === 'M' || selectedValue === 'F' || selectedValue === 'Other') {
            setGender(selectedValue as GenderProps);
        } else {
            // Handle the case where the selected value is not one of the specified values.
            console.error('Invalid gender selected:', selectedValue);
        }
    };

    /**
     * Handles the change event of a driving license input field in a form.
     *
     * Updates the 'hasLicense' state with the selected value ('Yes' or 'No').
     * Displays an alert message if 'No' is selected to inform the user of the preference for other transport.
     * It also updates and saves the survey data using the 'updateAndSaveSurvey' function.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleDrivingLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;

        if (selectedValue !== null) {
        setHasLicense(selectedValue);
        }
        if (selectedValue === 'No') {
            setAlert({
                showAlert: true,
                alertMessage: 'Thank you for your interest, but you prefer using other transport'
            });
        }
    };

    /**
     * Handles the blur event of a driving license input field in a form.
     *
     * Updates the 'hasLicense' state with the selected value ('Yes' or 'No').
     * Displays an alert message if 'No' is selected to inform the user of the preference for other transport.
     * It also updates and saves the survey data using the 'updateAndSaveSurvey' function.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleDrivingLicenseBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === 'No') {
            updateAndSaveSurvey();
        }
    };

    /**
     * Handles the change event of a first car input field in a form.
     *
     * Updates the 'isFirstCar' state with the selected value ('Yes' or 'No').
     * Displays an alert message if 'Yes' is selected to inform the user of the targeting preference.
     * It also updates and saves the survey data using the 'updateAndSaveSurvey' function.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleFirstCarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;
        setIsFirstCar(selectedValue);
        if (selectedValue === 'Yes') {
            setAlert({
                showAlert: true,
                alertMessage: 'We are targeting more experienced clients. Thank you for your interest.'
            });
        }
    };

    /**
     * Handles the blur event of a first car input field in a form.
     *
     * Updates the 'isFirstCar' state with the selected value ('Yes' or 'No').
     * Displays an alert message if 'Yes' is selected to inform the user of the targeting preference.
     * It also updates and saves the survey data using the 'updateAndSaveSurvey' function.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleFirstCarBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;

        if (e.target.value === 'Yes') {
            updateAndSaveSurvey();
        }
    };

    /**
     * Handles the change event of a drivetrain input field in a form.
     *
     * Updates the 'drivetrainOption' state with the selected value.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleDrivetrainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDrivetrainOption(e.target.value);
    };

    /**
     * Handles the change event of a fuel emissions input field in a form.
     *
     * Updates the 'isWorriedFuelEmissions' state with the selected value.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleWorriedFuelEmissionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorriedFuelEmissions(e.target.value);
    };

    /**
     * Handles the change event of the car number input field in a form.
     *
     * Updates the 'carNumber' state with the selected value and generates a new 'carInfoList' based on the specified car number.
     * Calls 'handleNext' if the current step is 1 (moving to the next step).
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the input change.
     */
    const handleCarNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const carNumberValue = parseInt(e.target.value);

        if (!isNaN(carNumberValue)) {
            setCarNumber(carNumberValue);
        } else {
            setCarNumber(0);
        }

        // Generate carInfoList with unique make and model values for each car
        const newCarInfoList = Array.from({length: carNumberValue}, () => ({
            make: "",
            model: ""
        }));
        setCarInfoList(newCarInfoList);
        // Call handleNext when car number changes
        if (step === 1) {
            handleNext();
        }
    };

    /**
     * Handles the change event of the car make select input field in a form.
     *
     * Updates the 'make' property of a specific car in the 'carInfoList' based on the provided index.
     *
     * @param {number} index - The index of the car in the 'carInfoList' to update.
     * @param {string} make - The selected car make value.
     */
    const handleCarMakeChange = (index: number, make: string) => {
        const updatedCarInfoList = [...carInfoList];
        updatedCarInfoList[index].make = make;
        setCarInfoList(updatedCarInfoList);
    };

    // Function to handle the change in car model
    const handleCarModelChange = (index: number, model: string) => {
        const updatedCarInfoList = [...carInfoList];
        updatedCarInfoList[index].model = model;
        setCarInfoList(updatedCarInfoList);
        // Validate model name for BMW
        if (updatedCarInfoList[index].make === "BMW") {
            validateBMWModel(model, index);
        }
    };

    /**
     * Handles the change event of the car model input field in a form.
     *
     * Updates the 'model' property of a specific car in the 'carInfoList' based on the provided index.
     * If the car make is 'BMW,' it also performs validation for the BMW model.
     *
     * @param {number} index - The index of the car in the 'carInfoList' to update.
     * @param {string} model - The updated car model value.
     */
    const validateBMWModel = (model: string, index: number) => {
        // Define the regex patterns for BMW models
        const pattern1 = /^(M)?\d+[diDI]?$/;
        const pattern2 = /^[XZ]\d$/i;

        // Check if the model matches either pattern
        const isValidModel = pattern1.test(model) || pattern2.test(model);

        // Update validation status for the current car
        const updatedCarInfoList = [...carInfoList];
        updatedCarInfoList[index].isValidModel = isValidModel;
        setCarInfoList(updatedCarInfoList);
    };

    /**
     * Mark the survey as complete, update and save the survey data, and display a completion alert.
     *
     * This function sets the 'surveyComplete' state to true to indicate that the survey is completed.
     * Finally, it displays a custom alert to thank the user for completing the survey.
     */
    const handleCompleteSurvey = () => {
        setSurveyComplete(true);
        // Display the custom alert when the survey is completed
        setAlert({showAlert: true, alertMessage: 'Thank you for completing the survey!'});
    };

    /**
     * Handles the completion of a survey.
     *
     * Sets the 'surveyComplete' state to true, indicating that the survey is completed.
     * Displays a custom alert to thank the user for completing the survey.
     */
    const handleAlertClose = () => {
        // Reload the page to original state when the "OK" button in the custom alert is clicked
        window.location.reload();
    };

    /**
     * Load survey data from local storage when the component mounts.
     *
     * This useEffect hook retrieves previously saved survey data from local storage
     * and sets it in the component's state if it exists.
     */
    useEffect(() => {
        const savedSurveyData = localStorage.getItem('surveyData');
        if (savedSurveyData) {
            const parsedData = JSON.parse(savedSurveyData);
            setSurveyData(parsedData);
        }
    }, []);

    /**
     * Saves survey data to local storage.
     *
     * This function takes an array of survey data objects and stores it in local storage
     * after converting it to JSON format.
     *
     * @param {CarProps[]} data - An array of survey data objects to be saved.
     */
    const saveSurveyDataToLocalStorage = (data: CarProps[]) => {
        console.log(data);
        localStorage.setItem('surveyData', JSON.stringify(data));
    };

    /**
     * Update and save the survey response to local storage.
     *
     * This function constructs a new survey response object based on the provided data
     * (age, hasLicense, isFirstCar, drivetrainOption, isWorriedFuelEmissions, carNumber, and carInfoList),
     * adds it to the survey data, and saves the updated survey data to local storage.
     */
    const updateAndSaveSurvey = () => {
        // Construct the new survey response
        const newSurveyResponse: CarProps = {
            age: null,
            hasLicense: null,
            isFirstCar: null,
            drivetrainOption: null,
            isWorriedFuelEmissions: null,
            carNumber: 0,
            make: carInfoList.map(car => car.make).join(', '),
            model: carInfoList.map(car => car.model).join(', '),
        };

        // Add car make and model information to the survey response
        newSurveyResponse.make = carInfoList.map((carInfo) => carInfo.make).join(', ');
        newSurveyResponse.model = carInfoList.map((carInfo) => carInfo.model).join(', ');

        // Add other survey data to the response
        newSurveyResponse.age = age;
        newSurveyResponse.hasLicense = hasLicense;
        newSurveyResponse.isFirstCar = isFirstCar;
        newSurveyResponse.drivetrainOption = drivetrainOption;
        newSurveyResponse.isWorriedFuelEmissions = isWorriedFuelEmissions;
        newSurveyResponse.carNumber = carNumber;

        // Update the survey data state with the new response
        const updatedSurveyData = [...surveyData, newSurveyResponse];
        setSurveyData(updatedSurveyData);

        // Save the updated survey data to local storage
        saveSurveyDataToLocalStorage(updatedSurveyData);
    }

    /**
     * Calculate and log survey information for the company's analysis.
     *
     * This function calculates various statistics and percentages based on survey data
     * and logs the results to the console.
     */
    const surveyInformationForCompany = () => {
        // Calculate statistics based on all respondents
        const totalRespondents = surveyData.length;

        // Calculate statistics based on all respondents
        // const totalRespondents = surveyData.length + 1; // Add 1 for the current respondent
        setAdolescents(surveyData.filter(respondent => respondent.age !== null && respondent.age < 18).length);
        setUnlicensed(surveyData.filter(respondent => respondent.hasLicense === 'No').length);
        setFirstTimers(surveyData.filter(respondent => respondent.age !== null && respondent.age >= 18 && respondent.age <= 25 && respondent.isFirstCar === 'Yes').length);
        setTargetables(surveyData.filter(respondent => respondent.age !== null && respondent.age >= 18 && respondent.hasLicense === 'Yes').length);
        setTargetablesWithFuelEmissions(surveyData.filter(respondent => respondent.isWorriedFuelEmissions === 'Yes').length);
        setTargetablesWithFwdOrIdk(surveyData.filter(respondent => respondent.drivetrainOption === 'FWD' || respondent.drivetrainOption === 'IDK').length);
        // const totalCarsInFamily = surveyData.reduce((total, respondent) => total + respondent.carNumber, 0);

        // Calculate the total number of cars in family, considering null values
        setTotalCarsInFamily(surveyData.reduce((total, respondent) => {
            if (typeof respondent.carNumber === 'number') {
                return total + respondent.carNumber;
            } else {
                return total;
            }
        }, 0));

        // Calculate percentages
        setPercentageAdolescents((adolescents / totalRespondents) * 100);
        setPercentageUnlicensed((unlicensed / totalRespondents) * 100);
        setPercentageFirstTimers((firstTimers / totalRespondents) * 100);
        setPercentageTargetables((targetables / totalRespondents) * 100);
        setPercentageFuelEmissionsCare((targetablesWithFuelEmissions / targetables) * 100);
        setPercentageFwdOrUnknownDrivetrain((targetablesWithFwdOrIdk / targetables) * 100);
        setAverageCarsInFamily(totalCarsInFamily / totalRespondents);

        const percentageAdolescents = (adolescents / totalRespondents) * 100;
        const percentageUnlicensed = (unlicensed / totalRespondents) * 100;
        const percentageFirstTimers = (firstTimers / totalRespondents) * 100;
        const percentageTargetables = (targetables / totalRespondents) * 100;
        const percentageFuelEmissionsCare = (targetablesWithFuelEmissions / targetables) * 100;
        const percentageFwdOrUnknownDrivetrain = (targetablesWithFwdOrIdk / targetables) * 100;
        const averageCarsInFamily = totalCarsInFamily / totalRespondents;
    }

    /**
     * Handle the form submission when the user submits the survey.
     *
     * This function prevents the default form submission, performs validation based on user input,
     * and takes appropriate actions based on the validation results, such as displaying alerts,
     * updating and saving the survey data, calculating survey information for the company, and
     * marking the survey as complete.
     *
     *
     * @param {React.FormEvent} e - The event object representing the form submission.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (age !== null && age < 18) {
            updateAndSaveSurvey();
            setAlert({showAlert: true, alertMessage: 'Thank you for your interest, but you are under 18.'});
        } else if (hasLicense === 'No') {
            updateAndSaveSurvey();
            setAlert({
                showAlert: true,
                alertMessage: 'Thank you for your interest, but you prefer using other transport'
            });
        } else if (age !== null && age >= 18 && age <= 25 && isFirstCar === 'Yes') {
            updateAndSaveSurvey();
            setAlert({
                showAlert: true,
                alertMessage: 'We are targeting more experienced clients. Thank you for your interest.'
            });
        } else {
            updateAndSaveSurvey();
            surveyInformationForCompany();
            handleCompleteSurvey();
        }
    }

    /**
     * Handles the click event when the "Show Results" button is clicked.
     * This function triggers the calculation and display of survey results.
     *
     * @function
     * @returns {void}
     *
     * @example
     * // In a React component render method:
     * <button onClick={handleShowResultsClick}>Show Results</button>
     */
    const handleShowResultsClick = () => {
        // Call the surveyInformationForCompany function to calculate and log survey results
        surveyInformationForCompany();
        // Update the showResult state to true when the button is clicked
        setShowResult(true);
    };

    const handleHideResultsClick = () => {
        // Update the showResult state to true when the button is clicked
        setShowResult(false);
    };

    return (
        <div className="App">
            <h1>Car Sales Survey</h1>
            {!surveyComplete && !showResult && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age !== null ? age : ''}
                        onBlur={handleAgeBlur}
                        onChange={handleAgeChange}
                        required
                        min="0"
                        max="100"
                    />
                    <br/>

                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={handleGenderChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <br/>

                    {age !== null && age >= 18 && (
                        <div>
                            <label htmlFor="license">Do you own a car driving license?</label>
                            <input
                                type="radio"
                                id="yes-license"
                                name="license"
                                value="Yes"
                                checked={hasLicense === 'Yes'}
                                onChange={handleDrivingLicenseChange}
                                onBlur={handleDrivingLicenseBlur}
                                required
                            />
                            <label htmlFor="yes-license">Yes</label>
                            <input
                                type="radio"
                                id="no-license"
                                name="license"
                                value="No"
                                checked={hasLicense === 'No'}
                                onChange={handleDrivingLicenseChange}
                                onBlur={handleDrivingLicenseBlur}
                                required
                            />
                            <label htmlFor="no-license">No, I prefer using other transport</label>
                            <br/>
                        </div>
                    )}

                    {/* Bonus question for users aged 18-25 */}
                    {age !== null && age >= 18 && age <= 25 && hasLicense === 'Yes' && (
                        <div>
                            <label htmlFor="first-car">Is this your first car?</label>
                            <input
                                type="radio"
                                id="yes-first-car"
                                name="first-car"
                                value="Yes"
                                checked={isFirstCar === 'Yes'}
                                onChange={handleFirstCarChange}
                                onBlur={handleFirstCarBlur}
                            />
                            <label htmlFor="yes-first-car">Yes</label>
                            <input
                                type="radio"
                                id="no-first-car"
                                name="first-car"
                                value="No"
                                checked={isFirstCar === 'No'}
                                onChange={handleFirstCarChange}
                                onBlur={handleFirstCarBlur}
                            />
                            <label htmlFor="no-first-car">No</label>
                        </div>
                    )}

                    {(age !== null && age >= 18 && hasLicense === 'Yes')
                    && (isFirstCar === 'No' || isFirstCar === null) && (
                        <div>
                            <label htmlFor="drivetrain">Which drivetrain do you prefer?</label>
                            <input
                                type="radio"
                                id="fwd"
                                name="drivetrain"
                                value="FWD"
                                checked={drivetrainOption === 'FWD'}
                                onChange={handleDrivetrainChange}
                            />
                            <label htmlFor="fwd-drivetrain">FWD</label>
                            <input
                                type="radio"
                                id="rwd"
                                name="drivetrain"
                                value="RWD"
                                checked={drivetrainOption === 'RWD'}
                                onChange={handleDrivetrainChange}
                            />
                            <label htmlFor="rwd-drivetrain">RWD</label>
                            <input
                                type="radio"
                                id="idk"
                                name="drivetrain"
                                value="IDK"
                                checked={drivetrainOption === 'IDK'}
                                onChange={handleDrivetrainChange}
                            />
                            <label htmlFor="idk-drivetrain">I don’t know</label>

                            <br/>

                            <label htmlFor="fuel-emissions">Are you worried about fuel emissions?</label>
                            <input
                                type="radio"
                                id="yes-fuel-emissions"
                                name="fuel-emissions"
                                value="Yes"
                                checked={isWorriedFuelEmissions === 'Yes'}
                                onChange={handleWorriedFuelEmissionsChange}
                            />
                            <label htmlFor="yes-fuel-emissions">Yes</label>
                            <input
                                type="radio"
                                id="no-fuel-emissions"
                                name="fuel-emissions"
                                value="No"
                                checked={isWorriedFuelEmissions === 'No'}
                                onChange={handleWorriedFuelEmissionsChange}
                            />
                            <label htmlFor="no-fuel-emissions">No</label>
                            <br/>

                            {(step === 1 || step === 2) && (
                                <div>
                                    <label htmlFor="carNumber">How many cars do you have in your family?</label>
                                    <input
                                        type="number"
                                        id="carNumber"
                                        value={carNumber === null ? '' : carNumber}
                                        onChange={handleCarNumberChange}
                                        required
                                        min="0"
                                    />
                                    <br/>
                                </div>
                            )}
                            {step === 2 && carNumber > 0 && (
                                <div>
                                    <h3>Question 8: Which car make and model do you drive?</h3>
                                    {carInputs}
                                </div>
                            )}
                        </div>
                    )}

                    <button type="submit">Submit</button>
                </form>
            )}

            {surveyComplete && (
                <div>
                    <p>Thank you for completing the survey!</p>
                </div>
            )}

            {showResult && (
                <div>
                    <h2>Survey Results</h2>
                    <p>How many under 18s participated: {adolescents}</p>
                    <p>How many unlicensed drivers participated: {unlicensed}</p>
                    <p>How many 18-25s first car owners participated: {firstTimers}</p>
                    <p>How many targetable clients participated: {targetables}</p>
                    <p>A breakdown of each respondent group by percentage:</p>
                    <p>Percentage of adolescents: {percentageAdolescents}%</p>
                    <p>Percentage of unlicensed drivers: {percentageUnlicensed}%</p>
                    <p>Percentage of first-time car owners (18-25): {percentageFirstTimers}%</p>
                    <p>Percentage of targetable clients: {percentageTargetables}%</p>
                    <p>The percentage of targetables that care about fuel emissions: {percentageFuelEmissionsCare}%</p>
                    <p>The percentage of targetables that picked FWD or "I don't know" for
                        drivetrain: {percentageFwdOrUnknownDrivetrain}%</p>
                    <p>The average amount of cars in a family: {averageCarsInFamily}</p>
                    <button className="results-button" onClick={handleHideResultsClick}>
                        Hide Results
                    </button>
                </div>
            )}

            {alert.showAlert && (
                <div className="custom-alert">
                    <div className="custom-alert-content">
                        <p>{alert.alertMessage}</p>
                        <button className="custom-alert-button" onClick={handleAlertClose}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {!showResult && (
                <div>
                    <button className="results-button" onClick={handleShowResultsClick}>
                        Show Results
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
