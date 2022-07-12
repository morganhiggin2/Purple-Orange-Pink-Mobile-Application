import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, Switch, Platform} from 'react-native';
import {TouchableOpacity, TouchableHighlight} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons'; 
import DropDownPicker from 'react-native-dropdown-picker';
import { PickerIOS } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js';

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
            height: 1,
            backgroundColor: GlobalValues.DARKER_OUTLINE
        }
    }
);

const section_styles = StyleSheet.create({
    body: {
        marginTop: "10%",
        backgroundColor: GlobalValues.DARKER_WHITE,
    },
    gap: {
        height: 30,
    }
});

const info_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white', //#FFCDCD
        marginHorizontal: 8,
        borderRadius: 4,
        marginVertical: 16
    }
});

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    input_text_view: {
        flexDirection:  'row',
    },
    multiline_input_text: {
        fontSize: 14, 
        maxHeight: "96px", 
        textAlignVertical: "top",
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'black',
        marginBottom: 2,
    },    text_input: {
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 95,
        borderRadius: 8,
    },
    inner_text: {
        color: 'gray',
        fontSize: 14,
        marginHorizontal: 4
    },
    slider: {
        alignSelf: 'center',
    },
    title_with_value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_value: {
        fontSize: 14,
        alignSelf: 'center'
    }
});

const inline_attribute_styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    title_view: {
        flexDirection: 'row',
    },
    text_view: {
        paddingVertical: 4
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
        paddingHorizontal: 4,
        width: '100%',
        textAlign: 'right',
        borderRadius: 4,
        fontSize: 16, 
    },
    drop_down_selector: {
        marginRight: -10
    },
    drop_down_selector_gap: {
        height: 100,
    },
    date_picker: {
        width: 200,
    }
});


export class ExploreFiltersScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for the list of activities
            attributes_input_handler: null,

            //for the activity dropdown
            type_dropdown_value: GlobalProperties.search_type,

            //for the genders
            gender_dropdown_value: GlobalProperties.search_gender,

            //age range values
            age_range_values: [GlobalProperties.search_minAge, GlobalProperties.search_maxAge],

            //medium
            medium: GlobalProperties.medium,
        }

        this.updateTypeDropDownValue = this.updateTypeDropDownValue.bind(this);
        this.updateGenderDropDownValue = this.updateGenderDropDownValue.bind(this);
        this.updateAgeRangeValues = this.updateAgeRangeValues.bind(this);
        this.updateMedium = this.updateMedium.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);
        
        GlobalProperties.return_screen = "Explore Filters Screen";
        GlobalProperties.screen_props = {search_filters_update: false};
    }

    render() {
        const renderComponent = ({item}) => {
            var typeSpecificFilters = {};

            if (GlobalProperties.search_type == "people") {
                typeSpecificFilters = (
                    <View>
                        <View style={main_styles.horizontal_bar} />
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.title_with_value}>
                                <Text style={attribute_styles.title_text}>
                                Age Range
                                </Text>
                                <Text style={attribute_styles.title_value}>
                                    {this.state.age_range_values[0] + " to " + this.state.age_range_values[1]}
                                </Text>
                            </View>
                        </View>
                        <View style={attribute_styles.slider}>
                            <Slider twoSlider={true} onChangeValue={this.updateAgeRangeValues} min={18} max={100} step={2} initialValue={this.state.age_range_values} backgroundColor={'#FF7485'}/> 
                        </View>
                        <View style={main_styles.horizontal_bar} />
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Gender
                            </Text>
                            <View style={inline_attribute_styles.drop_down_selector}>
                                <DropDown 
                                    style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                    items={[{label: 'All', value: ''}, {label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}, {label: "Other", value: "other"}]}
                                    onChangeValue = {this.updateGenderDropDownValue}
                                    currentValue = {this.state.gender_dropdown_value}
                                    width = {110}
                                    />
                            </View>
                        </View>
                    </View>
                );
            }
            else if (GlobalProperties.search_type == "activities") {
                typeSpecificFilters = (
                    <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Medium
                            </Text>
                            <View style={inline_attribute_styles.drop_down_selector}>
                                <DropDown 
                                    style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                    items={[{label: 'Both', value: ''}, {label: 'Physical', value: 'physical'}, {label: 'Virtual', value: 'virtual'}]}
                                    onChangeValue = {this.updateMedium}
                                    currentValue = {this.state.medium}
                                    width = {110}
                                    />
                            </View>
                        </View>
                );
            }
            else if (GlobalProperties.search_type == "groups") {
                typeSpecificFilters = (
                    <View>
                    </View>
                );
            }

            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Type
                            </Text>
                            <View style={inline_attribute_styles.drop_down_selector}>
                                    <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: 'People', value: 'people'}, {label: 'Activities', value: 'activities'}]}
                                        onChangeValue = {this.updateTypeDropDownValue}
                                        currentValue = {this.state.type_dropdown_value}
                                        width = {110}
                                        />
                            </View>
                        </View>
                        {typeSpecificFilters}
                    </View>
                    <View style={info_styles.body}>
                        <Text style={attribute_styles.inner_text}>
                            Use the map to set the search area. The bigger the area, the more search results.
                        </Text>
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
    //update the dropdown selector for activities
    updateTypeDropDownValue(value) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        GlobalProperties.search_type = value;

        this.state.type_dropdown_value = value;
        this.lazyUpdate();
    }

    //update the dropdown selector for activities
    updateGenderDropDownValue(value) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        GlobalProperties.search_gender = value;

        this.state.gender_dropdown_value = value;
    }

    //update the age range of the people
    updateAgeRangeValues(value) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        GlobalProperties.search_minAge = value[0];
        GlobalProperties.search_maxAge = value[1];

        this.state.age_range_values = value;
        this.lazyUpdate();
    }

    //update the medium of the activity
    updateMedium(value) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        GlobalProperties.medium = value;

        this.state.medium = value;
    }
}

class DropDown extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
        value: props.currentValue,
        items: props.items,
        width: props.width,
      };
  
      this.setValue = this.setValue.bind(this);
      this.changeValue = this.changeValue.bind(this);
    }
  
    //set the open state
    setOpen = (open) => {
      this.setState({
        open: open
      });
    }
  
    //set the value (ANDROID, involves a callback)
    setValue = (callback) => {
        //call the changeitem method from props
        this.props.onChangeValue(callback());

        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    changeValue = (item) => {
        this.props.onChangeValue(item);

        this.setState(state => ({
            value: item
        }));
    }
  
    //set the items (ANDROID, involves a callback)
    setItems = (callback) => {
      this.setState(state => ({
        items: callback(state.items)
      }));
    }
  
    render() {
      return (
        this.state.items ? (
            Platform.OS == 'ios' ? (
                this.state.open ? (
                    <PickerIOS
                        //open={open}
                        selectedValue={this.state.value}
                        //onValueChange={(value) => {this.setState({value: value, open: false});}}
                        onValueChange={(value) => {this.changeValue(value); this.setOpen(false)}}
                        style={{width: GlobalValues.IOS_DROPDOWN_WIDTH}}
                        >
                            {this.state.items.map((data) => {
                                return (
                                <PickerIOS.Item
                                   key={data.label}
                                   label={data.label}
                                   value={data.value}
                                />);
                            })}
                    </PickerIOS>
                ) : (
                    //, flexBasis: 'sp'
                    <View style={{alignSelf: 'flex-end'}}>
                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.setState({open: true})}}>
                            <Text style={{marginRight: 5}}>
                                {this.state.value == null ? "Select" : this.state.items.find(e => e.value == this.state.value).label} 
                            </Text>
                            <AntDesign style={{alignSelf: 'center'}} name="down" size={14} color="black"/>
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <View style={{width: this.state.width}}>
                    <DropDownPicker
                    open={this.state.open}
                    value={this.state.value}
                    items={this.state.items}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    setItems={this.setItems}
                    listMode={"SCROLLVIEW"}
                    textStyle={{fontSize: 14}}
                    style={{borderWidth: 0, width: this.state.width}}
                    dropDownContainerStyle={{borderWidth: 0, width: this.state.width}}
                    maxHeight={80}
                    placeholder={"Select"}
                    />

                    {this.state.open ? (
                        <View style={{height: 90}}/>
                    ) : (
                        <View/>
                    )}
                </View>
            )
        ) : (
            <View>

            </View>
        )
      );
    }
}

/*
                    style={{borderWidth: 0, borderRadius: 4, padding: 0, margin: 0}}
                    dropDownContainerStyle={{borderWidth: 0, borderRadius: 4, backgroundColor: "orange", height: 10}}*/

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue
        }

        this.onChangeValues = this.onChangeValues.bind(this);
    }
    
    onChangeValues(values) {
        this.state.value = values;
        this.props.onChangeValue(values);
    }

    render() {
        //if this is a slider with two markers
        if (this.props.twoSlider) {
            return(
                <MultiSlider
                    values = {[this.state.value[0], this.state.value[1]]}
                    onValuesChange = {this.props.onChangeValue}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    sliderLength={320}
                    isMarkersSeparated = {true}
                    width={'100%'}
                    snapped={true}
                    allowOverlap={false}
                    showSteps = {true}
                    showStepLabels = {true}
                    trackStyle = {{backgroundColor: GlobalValues.DISTINCT_GRAY, height: 4}}
                    selectedStyle={{backgroundColor: GlobalValues.ORANGE_COLOR, height: 4}}
                    markerStyle={{backgroundColor: 'white', borderColor: GlobalValues.DISTINCT_GRAY, borderWidth: 2, padding: 8}}
                    containerStyle={{margin: 0, padding: 0, height: 30}}
                    ios_backgroundColor = {GlobalValues.ORANGE_COLOR}
                />
            );
        }
        //one slider
        else {
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
                    snapped={true}
                    showSteps = {true}
                    showStepLabels = {true}
                    trackStyle = {{backgroundColor: GlobalValues.DISTINCT_GRAY, height: 4}}
                    selectedStyle={{backgroundColor: GlobalValues.ORANGE_COLOR, height: 4}}
                    markerStyle={{backgroundColor: 'white', borderColor: GlobalValues.DISTINCT_GRAY, borderWidth: 2, padding: 8}}
                    ios_backgroundColor = {GlobalValues.ORANGE_COLOR}
                />
            );
        }
    }
}
