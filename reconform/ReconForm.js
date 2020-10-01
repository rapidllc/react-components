import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import htmlForm from '../htmlForm';
import Input from '../input/Input';
// //import TextArea from '../fields/TextArea';
import ActionButton from '../button/Button.js';
import Select from '../select/Select.js';
import SelectOptGroups from '../select/SelectOptGroups.js';
import '../button/Button.scss';
 
const ReconhtmlForm = ({
  handleSelectProjectionsFile,
  handleSelectAttenuationFile,
  handleAttenuationCompensations,
  handleAttenuationScatterCompensations,

  handleCollimatorCompensations,
  handleIterations,
  handleReconButton,
  handleRadionuclide,
  handleScanner,
  handleCollimator,
  handleReconProtocol
}) => {

  const [projectionsFile, setProjectionsFile] = useState('');
  const [iterations, setIterations] = useState(1);
  const [attenuationFile, setAttenuationFile] = useState('.dcm');
  const [radioChangeAttenuation, setRadioChangeAttenuation] = useState('NoAttenuation');
  const [radioChangeCDR, setRadioChangeCDR] = useState('NoCDR');

  const SetRadioChangeCDR = (event) => {
    const radioValue = event.target.value;
    handleCollimatorCompensations(radioValue)
    setRadioChangeCDR(radioValue);
  }

  const SetRadioChangeAttenuation = (event) => {
    const radioValue = event.target.value;
    if(radioValue === "Attenuation") {
      setRadioChangeAttenuation(radioValue);
      handleAttenuationCompensations(true);
    } else if (radioValue === "AttenuationScatter") {
      setRadioChangeAttenuation(radioValue);
      handleAttenuationScatterCompensations(true);
    } else {
      console.log("NoAttenuation");
      setRadioChangeAttenuation(radioValue);
      handleAttenuationScatterCompensations(false);
     }
  }

  const radionuclide = [
    {
      value: "Lu-177",
      text: "Lu-177",
      optgroup: "Group 1"
    },
  ];

  const scanner = [
    {
      value: "null",
      text: "None",
      optgroup: "None"
    },
    {
      value: "Intevo",
      text: "Intevo",
      optgroup: "Siemens"
    },
  ];

  const collimator = [
    {
      value: "MEGP",
      text: "MEGP",
      optgroup: "Siemens"
    },

  ];

  const window = [
    {
      value: "Lu-177_w1",
      text: "Lu-177_w1",
      optgroup: ""
    },
    {
      value: "Lu-177_w2",
      text: "Lu-177_w2",
      optgroup: ""
    },
  ];

  const reconProtocols = [{
    value: "Y90_100keV_300keV",
    text: "Y90_100keV_300keV"
  }];

  const groupedOptions = {};
  scanner.forEach(option => {
    if (!groupedOptions[option.optgroup]) groupedOptions[option.optgroup] = [];
    groupedOptions[option.optgroup].push({
      value: option.value,
      text: option.text
    });
  });

  return (
    <>
      <fieldset id="recon_form_component">
        <ActionButton red children={"Select Projections File"} onClick={handleSelectProjectionsFile} />
        <br />
        {/* <label className="BaseField__label" htmlFor="Projectionsfile">Projections File: */}
          <input type="hidden" className="Input" id="projections_file_input" name="Projectionsfile" value={projectionsFile}
            onChange={() => setProjectionsFile(value)} />
        {/* </label> */}
        <br />
        <label className="BaseField__label" htmlFor="Radionuclide">Radionuclide:
        <select className="Select__select" name="Radionuclide" placeholder=""
            onChange={handleRadionuclide}>
            <option value="">None</option>
            <option value="Lu-177">Lu-177</option>
          </select>
        </label>
        <label className="BaseField__label" htmlFor="Collimator">Scanner:
        <SelectOptGroups groupedOptions={groupedOptions} onChange={handleScanner} ></SelectOptGroups>
        </label>

        <label className="BaseField__label" htmlFor="Collimator">Collimator:
        <select className="Select__select" name="Collimator" placeholder=""
            onChange={handleCollimator}>
            <option value="">None</option>
            <option value="MEGP">MEGP</option>
          </select>
        </label>

        <label className="BaseField__label" htmlFor="Protocol">Protocol:
        <select className="Select__select" name="Protocol" placeholder=""
            onChange={handleReconProtocol}>
            <option value="">None</option>
            <option value="Y90_100keV_300keV">Y90_100keV_300keV</option>
          </select>
        </label>

        <label className="BaseField__label" htmlFor="Iterations">Number of Iterations:
        <input type="number" className="Input" id="number_of_iterations_input" name="Iterations" min="1"
            onChange={handleIterations} />
        </label>

        <div>
        <label className="BaseField__label" htmlFor="Window">Compensations:
        <br />  <br />
          <label htmlFor="Attenuation" className="BaseField__label">
            <input type="radio" id="Attenuation" name="Attenuation" value="Attenuation"
              checked={radioChangeAttenuation === "Attenuation"}
              onChange={SetRadioChangeAttenuation}
            />Attenuation
        </label>
          <br />
          <label htmlFor="AttenuationScatter" className="BaseField__label">
            <input type="radio" id="AttenuationScatter" name="AttenuationScatter" value="AttenuationScatter"
              checked={radioChangeAttenuation === "AttenuationScatter"}
              onChange={SetRadioChangeAttenuation}
            />Attenuation and Scatter
        </label>
          <br />
          <label htmlFor="NoAttenuation" className="BaseField__label">
            <input type="radio" id="NoAttenuation" name="NoAttenuation" value="NoAttenuation"
              checked={radioChangeAttenuation === "NoAttenuation"}
              onChange={SetRadioChangeAttenuation}
            />No Compensations
        </label>
        <hr />
          <label htmlFor="FullCDR" className="BaseField__label">
            <input type="radio" id="FullCDR" name="FullCDR" value="FullCDR"
              checked={radioChangeCDR === "FullCDR"}
              onChange={SetRadioChangeCDR}
            />Full CDR
        </label>
          <br />
          <label htmlFor="GeometricCDR" className="BaseField__label">
            <input type="radio" id="GeometricCDR" name="GeometricCDR" value="GeometricCDR"
              checked={radioChangeCDR === "GeometricCDR"}
              onChange={SetRadioChangeCDR}
            />Geometric CDR
        </label>
          <br />
          <label htmlFor="NoCDR" className="BaseField__label">
            <input type="radio" id="NoCDR" name="NoCDR" value="NoCDR"
              checked={radioChangeCDR === "NoCDR"}
              onChange={SetRadioChangeCDR}
            />No CDR
        </label>
        </label>
        </div>
       
        <hr />
        <br />
        <ActionButton red children={"Select Attenuation File"} onClick={handleSelectAttenuationFile} />
        <br />
        {/* <label className="BaseField__label" htmlFor="Attenuationfile">Attenuation File: */}
          <input type="text" className="Input" id="attenuation_file_input"  name="Attenuationfile"
            value={attenuationFile} onChange={() => setAttenuationFile(value)}
          />
        {/* </label> */}
        
        <ActionButton red children={"Reconstruct"} onClick={handleReconButton} style={{width:'100%'}} />
        
      </fieldset>
    </>
  );

}

export default ReconhtmlForm;