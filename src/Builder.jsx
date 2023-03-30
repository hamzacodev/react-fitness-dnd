import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { AiFillDelete } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Menu4 from "./asset/menu-4.png";
import image77 from "./asset/image 77.png";
import MuscleGroup from "./asset/Muscle Group.png";
import Pen from "./asset/pen.png";
import Button from "./asset/Button.png";
import Button1 from "./asset/Button1.png";

const Builder = () => {
  // View 1 Items
  const [view1Items, setView1Items] = useState([
    {
      id: "item-1",
      name: "Item 1",
      children: [],
    },
    {
      id: "item-3",
      name: "Item 3",
      children: [
        {
          id: "sub-item-1",
          name: "Sub Item 1",
        },
        {
          id: "sub-item-2",
          name: "Sub Item 2",
        },
        {
          id: "sub-item-3",
          name: "Sub Item 3",
        },
      ],
    },
    {
      id: "item-4",
      name: "Item 4",
      children: [
        {
          id: "sub-item-4",
          name: "Sub Item 4",
        },
      ],
    },
  ]);

  // View 2 Items
  const [view2Items, setView2Items] = useState([]);

  // On Drag
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    const sourceIsParent = source.droppableId === "droppable";
    const destinationIsParent = destination.droppableId === "droppable";

    const sourceIsParent2 = source.droppableId === "droppable2";
    const destinationIsParent2 = destination.droppableId === "droppable2";

    if (
      source.droppableId === "droppable" &&
      destination.droppableId === "droppable2"
    ) {
      // Moving item from view 1 to view 2
      const updatedView1Items = Array.from(view1Items);
      const updatedView2Items = Array.from(view2Items);
      const [movedItem] = updatedView1Items.splice(source.index, 1);
      const clonedItem = { ...movedItem, id: uuidv4() };
      updatedView2Items.splice(destination.index, 0, clonedItem);

      // setView1Items(updatedView1Items); //This is remove items from view 1
      setView2Items(updatedView2Items);
    } else if (sourceIsParent && destinationIsParent) {
      // Moving parent item to a different position for view 1
      const updatedItems = Array.from(view1Items);
      const [removedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, removedItem);

      setView1Items(updatedItems);
    } else if (sourceIsParent2 && destinationIsParent2) {
      // Moving parent item to a different position for view 2
      const updatedItems = Array.from(view2Items);
      const [removedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, removedItem);

      setView2Items(updatedItems);
    } else if (!sourceIsParent2 && !destinationIsParent2) {
      // Moving sub-item within the same parent item
      const updatedItems = view2Items.map((item) => {
        if (item.id === source.droppableId) {
          const reorderedChildren = Array.from(item.children);
          const [removedChild] = reorderedChildren.splice(source.index, 1);
          reorderedChildren.splice(destination.index, 0, removedChild);
          item.children = reorderedChildren;
        }
        return item;
      });

      setView2Items(updatedItems);
    }
  }

  //On Delete
  const onDelete = (parentId, childId = null) => {
    if (childId === null) {
      //clonning it to view 1//
      //let tempObject = view2Items.filter((fl) => fl.id === parentId);
      //tempObject = tempObject[0];
      // setView1Items([...view1Items, tempObject]);

      //Deleting a parent task from view 2
      setView2Items((current) => current.filter((fl) => fl.id !== parentId));
    } else {
      //Deleting a sub task
      let tempArray = view2Items.map((items) => {
        let temp = items;
        let filteredObj = temp.children.filter(
          (childFl) => childFl.id !== childId
        );
        temp.children = filteredObj;
        return temp;
      });
      setView2Items(tempArray);
    }
  };

  // On Adding new set
  const AddNewSet = (parentId, index) => {
    let tempArray = [...view2Items];
    let result = tempArray.map((items) => {
      if (items.id === parentId) {
        items.children = [
          ...items.children,
          {
            id: "sub-item-" + index,
            name: "Sub Item " + index,
          },
        ];
      }
      return items;
    });
    setView2Items(result);
  };

  //IsDropping Disabled
  const [IsDroppingDisable, setIsDroppingDisable] = useState(true);
  const onDragStart = (start) => {
    if (start.source.droppableId === "droppable2") {
      setIsDroppingDisable(true);
    } else {
      setIsDroppingDisable(false);
    }
  };
  console.log("NOTHIGN");
  // ----------------------------------------------------------------------------- change in my side

  const Radius = ["1", "10", "250", "1000", "5000"];
  const WorkingSet = ["Working Set", "10", "250", "1000", "5000"];
  const Default = ["Default", "10", "250", "1000", "5000"];
  const [WorkingSet1, setWorkingSet1] = useState("Working Set");
  const [Default1, setDefault1] = useState("Default");
  return (
    <div className="container-wrapper border-m h-[86.6vh]">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {/*Left View*/}
        <div className="container w-[300px] w-m bg-[#131316] ">
          <p className="font-medium m-[12px] mb-[20px]">Exercise Database</p>
          <div>
            <Select
              className="h-[44px] rounded-[10px] w-[100%] mt-[10px] bg-[#1A1A1D] text-[12px] my-auto mb-4"
              name="Focus: Chest"
              labelId="demo-simple-select-label"
              label="Focus: Chest"
              value={WorkingSet1}
              onChange={(e) => setWorkingSet1(e.target.value)}
              required
              InputLabelProps={{
                shrink: false,
              }}
            >
              {WorkingSet.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
            <FormControl
              fullWidth
              className="mb-4 bg-[#1A1A1D] text-white rounded-[10px]"
            >
              <TextField
                className="w-[100%] text-white"
                id="outlined-number"
                type="text"
                label="Search"
              />
            </FormControl>
          </div>
          <Droppable droppableId="droppable" isDropDisabled={IsDroppingDisable}>
            {(provided, snapshot) => (
              <div
                className="w-[100%] flex flex-col items-center "
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? "" : "",
                }}
              >
                {view1Items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="item w-[270px] w-m2 bg-[]"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={{
                        //   backgroundColor: snapshot.isDragging
                        //     ? "#f2f2f2"
                        //     : "#f7f7f7",
                        //   ...provided.draggableProps.style,
                        // }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <img src={Menu4} />
                          </div>
                          <div className="flex relative px-[10px]">
                            <img src={image77} />
                            <div className="">
                              <img
                                className="absolute bottom-[-5px] right-[-10px]"
                                src={MuscleGroup}
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              marginLeft: "15pt",
                            }}
                          >
                            <p className="font-bold text-[15px] text-white hover:text-[#18181B]">
                              {item.name}
                            </p>
                            <p className="font-bold text-muted text-[12px]">
                              Chest
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/*Right View*/}
        <div className="container2 bg-black">
          <div className="between py-[18px]">
            <div className="flex ">
              <div className="flex">
                <p className="font-medium m-[12px] mb-[20px] mr-[15px] my-auto text-[18px]">
                  Slug
                </p>
                <img className="mt-[-15px] my-auto" src={Pen} />
              </div>
            </div>
            <div className="flex mb-[12px] flex-m">
              <div className="mx-[10px]">
                <Select
                  className="h-[36px] rounded-[10px] w-[148px] bg-[#26272B] text-[12px] my-auto"
                  name="Focus: Chest"
                  labelId="demo-simple-select-label"
                  label="Focus: Chest"
                  value={WorkingSet1}
                  onChange={(e) => setWorkingSet1(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: false,
                  }}
                >
                  {WorkingSet.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="mx-[10px]">
                <Select
                  className="h-[36px] rounded-[10px] w-[192px] mt-[10px] bg-[#26272B] text-[12px] my-auto"
                  name="Focus: Chest"
                  labelId="demo-simple-select-label"
                  label="Focus: Chest"
                  value={WorkingSet1}
                  onChange={(e) => setWorkingSet1(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: false,
                  }}
                >
                  {WorkingSet.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>

              <button className="btn text-[14px] bg-[#12B76A] text-black font-medium w-[120px] h-[36px] rounded-[7px]">
                <i class="fa-regular fa-calendar text-black my-auto "></i>{" "}
                Schedule
              </button>
            </div>
          </div>
          <div className="w-[100%] border-t"></div>
          <div className="flex my-4">
            <p className="font-medium m-[12px] mb-[20px] mr-[15px] my-auto text-[18px]">
              Title Of Workout Day
            </p>
            <img className="mt-[-15px] my-auto" src={Pen} />
          </div>

          {/* <div className="w-[100%] border-t "></div> */}
          <div>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  className="sub-container bg-balck"
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? "" : "",
                  }}
                >
                  {view2Items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="bg-back mt-4 mx-3"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            backgroundColor: snapshot.isDragging ? "" : "",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div
                            className="bg-[#18181B] p-[16px] rounded-[10px]"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              paddingRight: "6pt",
                            }}
                          >
                            <div
                              className=""
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                <img src={Menu4} />
                              </div>
                              <div className="flex relative px-[10px] mx-[20px]">
                                <img src={image77} />
                                <div className="">
                                  <img
                                    className="absolute bottom-[-5px] right-[-10px]"
                                    src={MuscleGroup}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  marginLeft: "15pt",
                                }}
                              >
                                <p className="font-bold text-[15px] text-white hover:text-[#18181B]">
                                  {item.name}
                                </p>
                                <p className="font-bold text-muted text-[12px]">
                                  Chest
                                </p>
                              </div>
                            </div>
                            <div className="flex my-auto">
                              <div>
                                <img className="mx-[10px]" src={Button1} />
                              </div>
                              <i
                                id="deleteIcon"
                                style={{ cursor: "pointer" }}
                                onClick={() => onDelete(item.id)}
                              >
                                <img src={Button} />
                              </i>
                            </div>
                          </div>

                          {/* child item  */}

                          <div className="mt-[15px] mx-[20px]">
                            {item.children && (
                              <Droppable droppableId={item.id} type="sub-item">
                                {(provided, snapshot) => (
                                  <div
                                    className="sub-items"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                      backgroundColor: snapshot.isDraggingOver
                                        ? ""
                                        : "",
                                    }}
                                  >
                                    {item.children.map((child, index) => (
                                      <Draggable
                                        key={child.id}
                                        draggableId={child.id}
                                        index={index}
                                      >
                                        {(provided, snapshot) => (
                                          <div
                                            className="sub-item border-t rounded-md mb-[3px]"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              backgroundColor:
                                                snapshot.isDragging ? "" : "",
                                              ...provided.draggableProps.style,
                                              color: "black",
                                              display: "flex",
                                              justifyContent: "space-between",
                                              flexDirection: "row",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div className="mr-[25px]">
                                                <img src={Menu4} />
                                              </div>{" "}
                                              <div className="mr-[25px]">
                                                <button className="w-[48px] h-[48px] rounded-[7px] flex justify-center items-center bg-[#26272B] text-[14px] text-white font-medium">
                                                  1
                                                </button>
                                              </div>
                                              <div className="">
                                                <p
                                                  className="text-light"
                                                  style={{
                                                    marginLeft: "",
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                  }}
                                                >
                                                  {child.name}
                                                </p>

                                                <div className="">
                                                  <Select
                                                    className="h-[30px] rounded-[10px] w-[160px] mt-[10px] bg-[#26272B] text-[12px]"
                                                    name="Focus: Chest"
                                                    labelId="demo-simple-select-label"
                                                    label="Focus: Chest"
                                                    value={WorkingSet1}
                                                    onChange={(e) =>
                                                      setWorkingSet1(
                                                        e.target.value
                                                      )
                                                    }
                                                    required
                                                    InputLabelProps={{
                                                      shrink: false,
                                                    }}
                                                  >
                                                    {WorkingSet.map(
                                                      (item, index) => {
                                                        return (
                                                          <MenuItem
                                                            key={index}
                                                            value={item}
                                                          >
                                                            {item}
                                                          </MenuItem>
                                                        );
                                                      }
                                                    )}
                                                  </Select>
                                                  <Select
                                                    className="h-[30px] rounded-[10px] w-[120px] mt-[10px] bg-[#26272B] text-[12px] mx-[10px]"
                                                    name="Focus: Chest"
                                                    labelId="demo-simple-select-label"
                                                    label="Focus: Chest"
                                                    value={Default1}
                                                    onChange={(e) =>
                                                      setDefault1(
                                                        e.target.value
                                                      )
                                                    }
                                                    required
                                                    InputLabelProps={{
                                                      shrink: false,
                                                    }}
                                                  >
                                                    {Default.map(
                                                      (item, index) => {
                                                        return (
                                                          <MenuItem
                                                            key={index}
                                                            value={item}
                                                          >
                                                            {item}
                                                          </MenuItem>
                                                        );
                                                      }
                                                    )}
                                                  </Select>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="flex">
                                              <Select
                                                className="h-[40px] rounded-[10px] w-[120px] mt-[10px] bg-[#26272B] text-[12px] mx-[10px]"
                                                name="Focus: Chest"
                                                labelId="demo-simple-select-label"
                                                label="Focus: Chest"
                                                value={Default1}
                                                onChange={(e) =>
                                                  setDefault1(e.target.value)
                                                }
                                                required
                                                InputLabelProps={{
                                                  shrink: false,
                                                }}
                                              >
                                                {Default.map((item, index) => {
                                                  return (
                                                    <MenuItem
                                                      key={index}
                                                      value={item}
                                                    >
                                                      {item}
                                                    </MenuItem>
                                                  );
                                                })}
                                              </Select>
                                              <Select
                                                className="h-[40px] rounded-[10px] w-[120px] mt-[10px] bg-[#26272B] text-[12px] mx-[10px]"
                                                name="Focus: Chest"
                                                labelId="demo-simple-select-label"
                                                label="Focus: Chest"
                                                value={Default1}
                                                onChange={(e) =>
                                                  setDefault1(e.target.value)
                                                }
                                                required
                                                InputLabelProps={{
                                                  shrink: false,
                                                }}
                                              >
                                                {Default.map((item, index) => {
                                                  return (
                                                    <MenuItem
                                                      key={index}
                                                      value={item}
                                                    >
                                                      {item}
                                                    </MenuItem>
                                                  );
                                                })}
                                              </Select>
                                              <Select
                                                className="h-[40px] rounded-[10px] w-[120px] mt-[10px] bg-[#26272B] text-[12px] mx-[10px]"
                                                name="Focus: Chest"
                                                labelId="demo-simple-select-label"
                                                label="Focus: Chest"
                                                value={Default1}
                                                onChange={(e) =>
                                                  setDefault1(e.target.value)
                                                }
                                                required
                                                InputLabelProps={{
                                                  shrink: false,
                                                }}
                                              >
                                                {Default.map((item, index) => {
                                                  return (
                                                    <MenuItem
                                                      key={index}
                                                      value={item}
                                                    >
                                                      {item}
                                                    </MenuItem>
                                                  );
                                                })}
                                              </Select>

                                              <i
                                                className="my-auto"
                                                id="deleteIcon"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  onDelete(item.id, child.id)
                                                }
                                              >
                                                <img src={Button} />
                                              </i>
                                            </div>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            )}
                          </div>

                          <div
                            className="add-set border-dotted border-2 border-gray-700 mx-[20px] mt-3"
                            onClick={() =>
                              AddNewSet(item.id, item.children.length + 1)
                            }
                          >
                            ADD SET
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  className="border-dotted border-2 border-gray-700 flex bg-[#18181B] rounded-[10px] mt-4 justify-center items-center font-medium text-light h-[60px]"
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? "" : "",
                  }}
                >
                  <i className="fa-solid fa-plus mx-[15px]"></i> Drop exercise
                  here
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Builder;
