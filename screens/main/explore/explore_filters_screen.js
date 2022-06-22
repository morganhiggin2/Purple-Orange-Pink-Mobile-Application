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
            height: 2,
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
        borderRadius: 5,
        paddingVertical: 4,
        marginVertical: "3%",
        marginHorizontal: '2%'
    }
});

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        paddingVertical: "3%",
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
        maxHeight: 95,
        paddingVertical: 4,
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
        paddingVertical: "3%",
        paddingHorizontal: "3%",
    },
    title_view: {
        flexDirection: 'row',
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
        paddingVertical: 4,
        paddingHorizontal: 4,
        width: '100%',
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        textAlign: 'left',
        fontSize: 18,
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
            age_range_values: [18, 100],
        }

        this.updateTypeDropDownValue = this.updateTypeDropDownValue.bind(this);
        this.updateGenderDropDownValue = this.updateGenderDropDownValue.bind(this);
        this.updateAgeRangeValues = this.updateAgeRangeValues.bind(this);

        this.addAttribute = this.addAttribute.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.removeAttribute = this.removeAttribute.bind(this);
        this.afterDeleteAlertAttributes = this.afterDeleteAlertAttributes.bind(this);

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
                            <View style={[inline_attribute_styles.drop_down_selector, Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH} : {width: '50%', alignSelf: 'flex-end'}]}>
                                <DropDown 
                                    style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                    items={[{label: 'All', value: ''}, {label: 'Male', value: 'male'}, {label: 'Female', value: 'female', }, {label: "Other", value: "other"}]}
                                    onChangeValue = {this.updateGenderDropDownValue}
                                    currentValue = {this.state.gender_dropdown_value}
                                    />
                            </View>
                        </View>
                    </View>
                );
            }
            else if (GlobalProperties.search_type == "activities") {
                typeSpecificFilters = (
                    <View>
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
                            <View style={inline_attribute_styles.title_view}>
                                <Text style={inline_attribute_styles.title_text}>
                                {"Attributes "}
                                </Text>
                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={() => {Alert.alert("Attributes", GlobalValues.ATTRIBUTES_INFORMATION);}}>
                                    <AntDesign name="infocirlceo" size={14} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>
                            </View>
                        </View>
                        <View style={filter_snaps_styles.container}> 
                            {GlobalProperties.search_attributes.map((attr, index) => {
                                return (
                                    <FilterSnap key={index} id={index} innerText={attr} parent={this}/>
                                );
                            })}
                        </View>      
                        
                    </View>

                    <View style={section_styles.gap} />
                    
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Type
                            </Text>
                            <View style={[inline_attribute_styles.drop_down_selector, Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH} : {width: '50%', alignSelf: 'flex-end'}]}>
                                    <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: 'People', value: 'people'}, {label: 'Activities', value: 'activities', }]}
                                        onChangeValue = {this.updateTypeDropDownValue}
                                        currentValue = {this.state.type_dropdown_value}
                                        />
                            </View>
                        </View>
                        {typeSpecificFilters}
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


    //for the filters
    addFilter(input) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        this.addAttribute(input);
        //clear the text input
        this.state.attributes_input_handler.clear();
        //update the screen
        this.lazyUpdate();
    }

    addAttribute(attribute) {
        //check if it already exists
        if (!GlobalProperties.search_attributes.includes(attribute)) {
            //if not, add it
            GlobalProperties.search_attributes.push(attribute);
        }
    }

    removeAttribute(attribute) {
        var newAttributes = []

        for (const attr of GlobalProperties.search_attributes) {
            if (attr != attribute) {
                newAttributes.push(attr);
            }
        }

        GlobalProperties.search_attributes = newAttributes;
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

    updateAgeRangeValues(value) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        GlobalProperties.search_minAge = value[0];
        GlobalProperties.search_maxAge = value[1];

        this.state.age_range_values = value;
        this.lazyUpdate();
    }

    //after delete alert, delete attribute and update screen
    afterDeleteAlertAttributes(attr) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        this.removeAttribute(attr);
        this.lazyUpdate();
    }
}

class DropDown extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
        value: props.currentValue,
        items: props.items
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
      const { open, value, items } = this.state;
  
      return (
        items ? (
            Platform.OS == 'ios' ? (
                open ? (
                    <PickerIOS
                        //open={open}
                        selectedValue={this.state.value}
                        //onValueChange={(value) => {this.setState({value: value, open: false});}}
                        onValueChange={(value) => {this.changeValue(value); this.setOpen(false)}}
                        style={{width: GlobalValues.IOS_DROPDOWN_WIDTH}}
                        >
                            {items.map((data) => {
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
                <View>
                    <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    setItems={this.setItems}
                    listMode={"SCROLLVIEW"}
                    style={{borderWidth: 0, borderRadius: 4, height: 40}}
                    dropDownContainerStyle={{borderWidth: 0, borderRadius: 4}}
                    maxHeight={120}
                    placeholder={"Select"}
                    />

                    {open ? (
                        <View style={{height: 120}}/>
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
                    sliderLength={300}
                    isMarkersSeparated = {true}
                    width={'100%'}
                    snapped={true}
                    allowOverlap={false}
                    showSteps = {true}
                    showStepLabels = {true}
                    trackStyle = {{backgroundColor: GlobalValues.DISTINCT_GRAY, height: 4}}
                    selectedStyle={{backgroundColor: GlobalValues.ORANGE_COLOR, height: 4}}
                    markerStyle={{backgroundColor: 'white', borderColor: GlobalValues.DISTINCT_GRAY, borderWidth: 2, padding: 8}}
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

class FilterSnap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <TouchableOpacity activeOpacity={1} onPress={() => {deleteAlertAttributes(this.props.parent, this.props.innerText, this.props.id)}}>
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

const deleteAlertAttributes = (frameComponent, attr) => {
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
                onPress: () => frameComponent.afterDeleteAlertAttributes(attr),
            }
        ],
        {
            cancelable: true,
        }
    );
}