/*
DO NOT DELETE

FILTER BASE MODEL SCREEN

import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, Switch} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {} from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            height: '50%',
            width: '100%',
            flexDirection: "column",
            flex: 1,
        },
        sub_section: {
            marginTop: '10%',
        },
        title_text: {
            alignSelf: 'center',
            fontSize: 24,
            color: 'gray',
            padding: 5,
        }, 
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        }
    }
);

const section_styles = StyleSheet.create({
    body: {
        marginTop: "10%",
        backgroundColor: "white",
    },
    gap: {
        height: 30,
    }
});

const info_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white', //#FFCDCD
        borderRadius: 5,
        paddingVertical: 4,
        marginVertical: "2%",
        marginHorizontal: '2%'
    }
});

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        paddingVertical: "2%",
        paddingHorizontal: "3%",
    },
    input_text_view: {
        flexDirection:  'row',
    },
    multiline_input_text: {
        fontSize: 18, 
        maxHeight: "96px", 
        textAlignVertical: "top",
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'black',
        marginBottom: 6,
    },
    text_input: {
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 92,
        paddingVertical: 2,
        paddingHorizontal: 4,
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
    },
    slider: {
        alignSelf: 'center',
    },
    title_with_value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_value: {
        fontSize: 16,
        alignSelf: 'center'
    }
});

const inline_attribute_styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: "2%",
        paddingHorizontal: "3%",
    },
    title_text: {
        alignSelf: 'flex-start',
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
    },
    input_text_view: {
        flexDirection:  'row',
        width: "70%",
    },
    text_input: {
        textAlignVertical: "center",
        paddingVertical: 2,
        paddingHorizontal: 4,
        width: '100%',
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        textAlign: 'right',
    },
    drop_down_selector: {
        paddingHorizontal: 4,
    },
    drop_down_selector_gap: {
        height: 100,
    },
    date_picker: {
        width: 200,
    }
});

const filter_snaps_styles = StyleSheet.create(
    {
        inner_text: {
            borderRadius: 5,
            borderWidth: 2,
            paddingHorizontal: 3,
            paddingVertical: 1,
            fontSize: 16,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginBottom: 8,
            textAlign: 'center',
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
        }
    }
);

var ACTIVITIES = [
    {
        id: 0,
        name: "mountain biking"
    },
    {
        id: 1,
        name: "fishing"
    },
    {
        id: 2,
        name: "travel"
    },
    {
        id: 3,
        name: "camping"
    }
];

export class ExploreFiltersScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for the date selector
            date: new Date(Date.now()),
            showDatePicker: false,
            showTimePicker: false,

            //for the list of activities
            activities_input_handler: null,
            activities_max_index: Object.keys(ACTIVITIES).length,

            //for the activity dropdown
            activity_dropdown_value: "hey",

            //for the enable
            enable_value: true,

            //for the slider
            slider_value: 0,
        }

        this.updateActivityDropDownValue = this.updateActivityDropDownValue.bind(this);
        this.updateEnableValue = this.updateEnableValue.bind(this);
        this.updateSliderValue = this.updateSliderValue.bind(this);
    }

    render() {
        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Title
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Description
                            </Text>     
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} multiline={true} editable={true} maxLength={160} numberOfLines={4} scrollEnables={true} />
                            </View>                   
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Date
                            </Text>       
                            <View style={attribute_styles.input_text_view}>
                                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                                    <Text style={{color: GlobalValues.ORANGE_COLOR}}>
                                            {this.showDate()} 
                                            {" "}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({showTimePicker: true})}>
                                    <Text style={{color: GlobalValues.ORANGE_COLOR}}>
                                        {this.showTime()}
                                    </Text>
                                </TouchableOpacity>
                            </View>   
                        </View>
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        {this.showDatePicker()}
                        {this.showTimePicker()}
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Activities
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} ref={(input) => {this.state.activities_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>
                            </View>
                        </View>
                        <View style={filter_snaps_styles.container}> 
                            {ACTIVITIES.map((data, key) => {
                                return (
                                    <FilterSnap key={key} id={data.id} innerText={data.name} parent={this} data={ACTIVITIES}/>
                                );
                            })}
                        </View>                            
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Enable
                            </Text>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {this.state.enable_value ? 'white': 'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateEnableValue}
                                value = {this.state.enable_value}
                            />
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Activities
                            </Text>
                            <View style={inline_attribute_styles.drop_down_selector}>
                                <View style={{width: '50%', alignSelf: 'flex-end', marginRight: 10}}>
                                    <DropDown 
                                        items={[{label: 'Apple', value: 'apple'}, {label: 'Banana', value: 'banana', }, {label: "Orange", value: "orange"}, {label: "Pear", value: "pear"},   {label: "Pearr", value: "pearr"},  {label: "Pearrr", value: "pearrr"}]}
                                        onChangeValue = {this.updateActivityDropDownValue}
                                        />
                                </View>
                            </View>
                        </View>
                        <View style={{}}>
                        </View>
                        
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.title_with_value}>
                                <Text style={attribute_styles.title_text}>
                                    Slider
                                </Text>
                                <Text style={attribute_styles.title_value}>
                                    {this.state.slider_value}
                                </Text>
                            </View>
                            <View style={attribute_styles.slider}>
                                <Slider onChangeValue={this.updateSliderValue} min={0} max={10} step={1} initialValue={0} backgroundColor={'#FF7485'}/>
                            </View>
                        </View>
                    </View>

                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                </View>
            );
        };

        return (
            <View style={[main_styles.page, {flex: 1}]}>
                <FlatList data={[{id: 1}]} keyExtractor={() => "dummy"} listEmptyComponent={null} renderItem={renderComponent} style={{zIndex: 99, flex: 1}}/>
            </View>
        );
    }

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }

    //for the time setting
    showDate() {
        //when you press cancel, it gives an undefined date
        //so check if is undefined (cancel has been pressed, or other)
        if (this.state.date == undefined) {
            this.state.date = Date.now();
        }

        return (this.state.date.toDateString());
    }

    showTime() {
        //when you press cancel, it gives an undefined date
        if (this.state.date == undefined) {
            this.state.date = Date.now();
        }

        //calulate the format for the time
        var hours = this.state.date.getHours();
        var partOfDay = "AM";

        if (hours - 12 > 0) {
            partOfDay = "PM";
        }

        hours = hours % 12;

        var minutes = this.state.date.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return (hours + ":" + minutes + " " + partOfDay);
    }

    //show the date picker
    showDatePicker() {
        if (this.state.showDatePicker) {
            this.state.showDatePicker = false;

            return(
                <DateTimePicker mode="date" value={this.state.date} is24Hour={true} display="default" onChange={(event, newDate) => {this.state.date = newDate; this.lazyUpdate();}}/>            
            );
        }
        else {
            return (<View/>);
        }
    }

    //show the time picker
    showTimePicker() {
        if (this.state.showTimePicker) {
            this.state.showTimePicker = false;

            return(
                <DateTimePicker mode="time" value={this.state.date} is24Hour={false} display="default" onChange={(event, newDate) => {this.state.date = newDate; this.lazyUpdate();}}/>            
            );
        }
        else {
            return (<View/>);
        }
    }

    //for the filters
    addFilter(input) {
        //add it
        ACTIVITIES.push({id: this.state.activities_max_index, name: input});
        //increment the max index
        this.state.activities_max_index++;
        //clear the text input
        this.state.activities_input_handler.clear();
        //update the screen
        this.lazyUpdate();
    }

    //delete a data component from a json data structure with id attributes, each different
    deleteDataComponent(id, DATA) {
        for (let [i, data] of DATA.entries()) {
            if (data.id == id) {
                DATA.splice(i, 1);
            }
        }
    }

    //update the dropdown selector for activities
    updateActivityDropDownValue(value) {
        this.state.activity_dropdown_value = value;
    }

    //update the enable value
    updateEnableValue(value) {
        this.setState({enable_value: value});
    }

    updateSliderValue(value) {
        this.setState({slider_value: value});
    }

    //after the delete alert, and delete has been pressed
    afterDeleteAlert(id, DATA) {
        this.deleteDataComponent(id, DATA);
        this.lazyUpdate();
    }
}

class DropDown extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        open: false,
        value: null,
        items: props.items
      };
  
      this.setValue = this.setValue.bind(this);
    }
  
    //set the open state
    setOpen = (open) => {
      this.setState({
        open: open
      });
    }
  
    //set the value
    setValue = (callback) => {
        //call the changeitem method from props
        this.props.onChangeValue(callback());

        this.setState(state => ({
        value: callback(state.value)
        }));
    }
  
    //set the items
    setItems = (callback) => {
      this.setState(state => ({
        items: callback(state.items)
      }));
    }
  
    render() {
      const { open, value, items } = this.state;
  
      return (
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={this.setOpen}
            setValue={this.setValue}
            setItems={this.setItems}
            listMode={"SCROLLVIEW"}
            style={{borderWidth: 0, borderRadius: 4, height: 50, backgroundColor: GlobalValues.DARKER_OUTLINE}}
            dropDownContainerStyle={{borderWidth: 0, borderRadius: 4, backgroundColor: GlobalValues.DARKER_OUTLINE}}
            maxHeight={120}
          />
      );
    }
}

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue
        }
    }

    render() {
        return(
            <MultiSlider
                values = {this.value}
                onValuesChange = {this.props.onChangeValue}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                sliderLength={300}
                isMarkersSeparated = {true}
                width={'100%'}
                showSteps = {true}
                showStepLabels = {true}
                trackStyle = {{backgroundColor: '#b8b8b8', height: 4}}
                selectedStyle={{backgroundColor: this.props.backgroundColor, height: 4}}
                markerStyle={{backgroundColor: 'white', borderColor: '#b8b8b8', borderWidth: 1, padding: 8}}
                ios_backgroundColor = {'#b8b8b8'}
            />
        );
    }
}

class FilterSnap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <TouchableOpacity activeOpacity={1} onPress={() => {deleteAlert(this.props.parent, this.props.data, this.props.id)}}>
                <Text style={[filter_snaps_styles.inner_text, { backgroundColor: this.props.color, borderColor: this.props.color}]}>
                    {this.props.innerText}
                </Text>
            </TouchableOpacity>
        );
    }
}

FilterSnap.defaultProps = {
    color: GlobalValues.ORANGE_COLOR,
}

//create a delete alert for deleting an attribute of id=id from
// a json data structure with id attributes, each different.
const deleteAlert = (frameComponent, DATA, id) => {
    Alert.alert(
        "Delete",
        "Are you sure you want to delete this attribute?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => frameComponent.afterDeleteAlert(id, DATA),
            }
        ],
        {
            cancelable: true,
        }
    );
}

*/ 

