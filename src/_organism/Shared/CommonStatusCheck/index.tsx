import React, { useEffect, useState } from "react";
import Flyout from "../../../_molecule/Flyout";
import { Formik, Form, Field, FieldArray } from "formik";
import FormFieldSelect from "../../../_molecule/FormFieldSelect";
import "./index.css";
import MassUpload from "../../../_molecule/MassUpload/index";
import DataTableComponent from "../../../_molecule/DataTableComponent/index";
import ConfirmPopUp from "../../../_molecule/ConfirmPopUp/index";
import FormField from "../../../_molecule/FormField/index";
import { FilledButton } from "../../../_atom/Buttons/index";
import { Container } from "../../WalkThroughPage/styled";
import minus from "../../../Icons/plus1.svg";
import plus from "../../../Icons/minus1.svg";
import { CommonStatusCheckProps, FeatureName } from "./types";

const CommonStatusCheck: React.FC<CommonStatusCheckProps> = (props) => {
  const [display, setDisplay] = useState("-450px");
  const [search, setSearch] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [showonly, setShowonly] = useState("");
  const [type, setType] = useState("input");

  useEffect(() => {
    if (props.edit) {
      setDisplay("0");
    }
  }, [props.refresh]);

  useEffect(() => {
    setDisplay("-450px");
  }, [props.close]);

  // const handleCheckboxChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   item: any,
  //   name: string,
  //   values: any,
  //   setFieldValue: any,
  //   id: number
  // ) => {
  //   if (e.target.checked) {
  //     const checkBoxvalue = [...values[name], item];
  //     setFieldValue(name, checkBoxvalue);
  //   } else {
  //     const removeddata = values[name].filter((items: any) => items !== item);
  //     console.log("removeddata >>.", removeddata);
  //     setFieldValue(name, removeddata);
  //   }
  // };

  // const handleSelectAllChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   name: string,
  //   items: any[],
  //   setFieldValue: any,
  //   values: any,
  //   id: number
  // ) => {
  //   if (e.target.checked) {
  //     const checkBoxvalue = [id, ...values[name], ...items];
  //     setFieldValue(name, checkBoxvalue);
  //   } else {
  //     const removeddataitem = values[name].filter(
  //       (item: any) => !items.includes(item)
  //     );
  //     const removeid = removeddataitem.filter((item: any) => item !== id);
  //     setFieldValue(name, removeid);
  //   }
  // };

  // const isAllSelected = (children: any[], values: any, name: string) => {
  //   return children.every((element) => values[name].includes(element));
  // };

  // const CommonHaderHandler: React.FC<{
  //   header: string;
  //   name: string;
  //   children: any;
  //   id: number;
  //   setFieldValue: any;
  //   values: any;
  //   con: any;
  // }> = ({ header, name, children, id, setFieldValue, values, con }) => {
  //   return (
  //     <div className="flexbox">
  //       <Checkbox
  //         className="feature-checkbox"
  //         name={name}
  //         checked={
  //           children?.length
  //             ? isAllSelected(children.map((e) => e?.id), values, name)
  //             : values[name]?.includes(parseInt(id))
  //         }
  //         onChange={(e) =>
  //           handleSelectAllChange(
  //             e,
  //             name,
  //             children.length ? children.map((e) => e?.id) : [parseInt(id)],
  //             setFieldValue,
  //             values,
  //             parseInt(id)
  //           )
  //         }
  //       />
  //       <BoxText>{header}</BoxText>
  //     </div>
  //   );
  // };

  // console.log("initialValues >>>.", props.initialValues);



  const FormComponent: React.FC = () => {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleSubmit}
      >
        {({
          isSubmitting,
          setFieldValue,
          isValid,
          values,
          setValues,
          // onChange
        }) => (
          <Form style={{ height: "100vh", overflow: "auto" }}>
            
            {props.title === "Feature" && (
              <div>
                <FormField
                  name="name"
                  fieldName="Feature Title"
                  type="input"
                  required={true}
                />
                <div className="child-feat">
                  <FormField
                    name="linkedFeature"
                    fieldName="Linked Feature"
                    value={values?.children?.length > 0 ? "Yes" : "No"}
                    required={true}
                    noteditable={"true"}
                  />
                  <button
                    type="button"
                    className="btn-feat"
                    onClick={() => props.packedData.onUpdate!(values, setValues)}
                  >
                    <img src={plus} alt="icon" />
                  </button>
                </div>
                {values?.children?.length >= 0 && (
                  <FieldArray name="children">
                    {() =>
                      values?.children?.map((item: FeatureName, i: number) => {
                        return (
                          <div key={i} className="child-feat">
                            <FormField
                              name={`children.${i}.name`}
                              // fieldName={field.fieldName}
                              type="input"
                              // required={field.required}
                              //value={values?.children[id][field.name]}
                            />
                            {values?.children?.length >= 1 && (
                              <button
                                type="button"
                                className="btn-feat"
                                onClick={() =>
                                  props.packedData.onRemoveFromList!(
                                    i,
                                    values,
                                    setValues
                                  )
                                }
                              >
                                <img src={minus} alt="icon" />
                              </button>
                            )}
                          </div>
                        );
                      })
                    }
                  </FieldArray>
                )}
              </div>
            )}

            {props.title !== "Feature" &&
              props.fieledTypes!.map((field, id) => {
                return (
                  <div key={id}>
                    {field.type === "input" ? (
                      field.notEditable && props.edit ? (
                        <FormField
                          name={field.name}
                          fieldName={field.fieldName}
                          type={field.fieldType}
                          required={field.required}
                          removeBorder={true}
                        />
                      ) : (
                        <FormField
                          name={field.name}
                          fieldName={field.fieldName}
                          type={field.fieldType}
                          required={field.required}
                        />
                      )
                    ) : field.type === "select" ? (
                      <FormFieldSelect
                        name={field.name}
                        fieldName={field.fieldName}
                        options={field.options}
                        onChange={(selected: any, options: any): any => {
                          if (field.isMulti) {
                            if (selected?.length === options?.length) {
                              setFieldValue(field?.name, "All");
                            } else {
                              setFieldValue(field?.name, selected.join(","));
                            }
                          } else {
                            if (field.isRadio) {
                              setFieldValue(field?.name, selected.value);
                            } else {
                              setFieldValue(field?.name, selected);
                            }
                          }
                        }}
                        required={field.required}
                        value={values[field.name]}
                        isMulti={field.isMulti}
                        isRadio={field.isRadio}
                        placeholder={field.placeholder}
                      />
                    ) : // : field.type === 'checkbox' ? (
                    //   <Accordion
                    //     multiple
                    //     className={
                    //       props.activeRole === 'Roles'
                    //         ? 'feature-tab-roles'
                    //         : 'feature-tab'
                    //     }
                    //   >
                    //     {props.packedData.Feature?.map((con, id) => (
                    //       <AccordionTab
                    //         key={id}
                    //         header={
                    //           <CommonHaderHandler
                    //             header={con?.name}
                    //             name={field.name}
                    //             children={con?.children}
                    //             id={con?.id}
                    //             setFieldValue={setFieldValue}
                    //             values={values}
                    //             con={con}
                    //           />
                    //         }
                    //         className={
                    //           con?.children?.length
                    //             ? 'feature'
                    //             : 'feature disabled-tab'
                    //         }
                    //       >
                    //         {con?.children?.map((child, id) => (
                    //           <ChildBox key={id}>
                    //             <div className="flexbox">
                    //               <Checkbox
                    //                 name={`${field.name}.${child?.name}`}
                    //                 className="feature-checkbox"
                    //                 checked={values[field.name].includes(
                    //                   child?.id
                    //                 )}
                    //                 onChange={(e) =>
                    //                   handleCheckboxChange(
                    //                     e,
                    //                     child?.id,
                    //                     field.name,
                    //                     values,
                    //                     setFieldValue,
                    //                     id
                    //                   )
                    //                 }
                    //               />
                    //               <BoxText>{child?.name}</BoxText>
                    //             </div>
                    //           </ChildBox>
                    //         ))}
                    //       </AccordionTab>
                    //     ))}
                    //   </Accordion>
                    // )
                    null}
                  </div>
                );
              })}
            <FilledButton
              filled={true}
              type="submit"
              style={{
                height: "50px",
                width: "112px",
                borderRadius: "5px",
                marginTop: "22px",
              }}
              content={props.edit ? "Update" : "Save"}
              disabled={!isValid || isSubmitting}
            />
          </Form>
        )}
      </Formik>
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStartSearch(!startSearch);
  };

  const buttonStyle = {
    marginLeft: "auto",
    borderRadius: "4px",
    background: "#0AB39C",
    width: "65px",
    height: "28px",
    padding: "0px",
    border: "none",
    fontWeight: "500",
    marginRight: "5px",
  };

  return (
    <>
      <Flyout
        style={{ width: "450px", right: display }}
        onHide={() => {
          setDisplay("-450px");

          if (props.title !== "Feature") {
            props.setInitialValues({});
          }
        }}
        title={props.flyoutTitle}
      >
        {props.edit ? (
          <div style={{ padding: "1.25rem" }}>
            <div
              style={{
                height: "90vh",
                overflow: "auto",
                paddingRight: "10px",
              }}
            >
              <FormComponent />
            </div>
          </div>
        ) : (
          <div style={{ padding: "20px" }}>
            {type === "input" ? (
              <div
                style={{
                  height: "90vh",
                  overflow: "auto",
                  paddingRight: "20px",
                }}
              >
                <FormComponent />
              </div>
            ) : (
              <MassUpload
                getData={props.packedData.getData}
                url={props.bulkUrl}
                type={props.title}
                sampleFields={props.sampleFields}
                onHide={() => setDisplay("-450px")}
                errorFields={props.errorFields}
              />
            )}
          </div>
        )}
      </Flyout>
      <Container style={{ paddingBottom: "0px" }}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div className="container-title">{props.title}</div>
            <div>
              <FilledButton
                style={buttonStyle}
                onClick={() => {
                  setDisplay("0");
                  props.setEdit(false);
                  setType("input");
                  if (props.title === "Feature") {
                    props.setInitialValues({
                      id: "",
                      name: "",
                      linkedFeature: "",
                      children: [{ name: "" }],
                    });
                  }
                }}
                content="+ Add"
              />

              {/* <FilledButton
                style={buttonStyle}
                onClick={() => {
                  setDisplay("0");
                  props.setEdit(false);
                  setType("upload");
                }}
                content="+ Import"
              /> */}
            </div>
          </div>
          <DataTableComponent
            packedData={props.packedData}
            tableDefinition={props.tableDefinition}
            onEdit={props.onEdit}
            globalFilters={props.globalFilters}
            onPageChange={props.onPageChange}
            search={search}
            modalFields={props.modalFields}
            startSearch={startSearch}
            title={props.title}
     
          />
        </div>
      </Container>

      {props.del ? (
        <ConfirmPopUp
          onYes={() => props.handleDelete()}
          onClose={() => props.setDelete(false)}
          isDeletePopUp={true}
          alertMessage={`Are you sure you want to delete this ${props.title} ?`}
        />
      ) : null}
    </>
  );
};

export default CommonStatusCheck;
