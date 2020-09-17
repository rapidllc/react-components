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

import ProgressBar from '../progressbar/ProgressBar.js';

const ReconhtmlForm = ({
  handleSelectProjectionsFile,
  handleSelectAttenuationFile,
  handleAttenuationCompensations,
  handleAttenuationScatterCompensations,
  handleCollimatorCompensations,
  handleReconButton,
  handleRadionuclide,
  handleScanner,
  handleCollimator,
  handleWindow
}) => {

  const [projectionsFile, setProjectionsFile] = useState('.dcm');
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
      handleAttenuationCompensations(event);
    } else if(radioValue === "AttenuationScatter") {
      setRadioChangeAttenuation(radioValue);
      handleAttenuationScatterCompensations(event);
    } else {
      //clear all setting for compensations
      setRadioChangeAttenuation(radioValue);
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
          <input type="text" className="Input" id="projections_file_input" name="Projectionsfile" value={projectionsFile}
            onChange={() => setProjectionsFile(value)} />
        {/* </label> */}
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

        <label className="BaseField__label" htmlFor="Window">Window:
        <select className="Select__select" name="Window" placeholder=""
            onChange={handleWindow}>
            <option value="">None</option>
            <option value="Lu-177_w1">Lu-177_w1</option>
            <option value="Lu-177_w2">Lu-177_w2</option>
          </select>
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