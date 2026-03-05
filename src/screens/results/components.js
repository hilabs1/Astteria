import React from 'react';
import { TouchableOpacity, Text, Image, View, Modal, TextInput, StyleSheet, Platform, Switch, CheckBox } from 'react-native';
import Swiper from 'react-native-swiper';
import { TEXT, writeToClipboard, isTablet } from '../../Cortex';
// import ViewPager from '@react-native-community/viewpager';
import * as strings from '../strings';
import * as colors from '../colors';

import { detailViews, callMenu, phones, footerItems, shareModal } from './styling';

import phoneCall from './pics/phoneCall.png';
import envelope from './pics/envelope.png';

export const SwitchBox = ({ value, valueChange, text, textStyle }) => (
	<View style = {shareModal.switchBox} >
		{Platform.OS === 'ios'
			? <Switch style={{ alignSelf: 'center' }}
				value={value}
				onValueChange={() => valueChange()}/>
			: <CheckBox style={{ alignSelf: 'center' }}
				value={value}
				onValueChange={() => valueChange()}/>}
		<Text style = {textStyle}>{text}</Text>
	</View>
);

export const PriceEdit = ({ style, changeInput, placeholder, value, editable }) => (
	<TextInput
		style = {style}
		autoCapitalize='none'
		autoCorrect = {false}
		onChangeText = {text => changeInput(text)}
		multiline={false}
		placeholderTextColor={colors.searchFieldGray}
		placeholder= { placeholder}
		underlineColorAndroid= {colors.trans}
		borderWidth={StyleSheet.hairlineWidth}
		keyboardType='numeric'
		value = {value}
		editable = {editable} />
);

export const FooterButton = ({ onPressed, text }) => (
	<TouchableOpacity
		style = {footerItems.touchable}
		onPress = {() => onPressed()}>
		<Text style={footerItems.footerText}>{text}</Text>
	</TouchableOpacity>
);

export const CallMenu = ({ redirectToCall, redirectToMail }) => (
	<View style = {callMenu.optionMenu} >
		{!isTablet && <TouchableOpacity
			onPress = {() => redirectToCall()}>
			<Image style = {callMenu.imageStyle}
				source = {phoneCall}
				resizeMode = 'contain'>
			</Image>
		</TouchableOpacity>}

		<TouchableOpacity
			onPress = {() => redirectToMail()}>
			<Image style = {callMenu.imageStyle}
				source = {envelope}
				resizeMode = 'contain'>
			</Image>
		</TouchableOpacity>
	</View>
);

export const Phones = ({ callPhone }) => (

	<View style={phones.viewStyle}>
		<TouchableOpacity
			style ={phones.phonesTouchable}
			onPress = {() => callPhone(strings.phone)}>
			<Text style = {phones.phonesTexts}>{strings.phone}</Text>
		</TouchableOpacity>

		<Text>|</Text>

		<TouchableOpacity
			style = {phones.phonesTouchable}
			onPress = {() => callPhone(strings.phoneCH)}>
			<Text style = {phones.phonesTexts}>{strings.phoneCH}</Text>
		</TouchableOpacity>
	</View>
);

export const BlueButton = ({ openLink }) => (
	<TouchableOpacity style ={detailViews.blueButton}
		onPress = {() => openLink() } >
		<Text style = {detailViews.blueButtonText}>{TEXT.certView}</Text>
	</TouchableOpacity>
);

// ======= IMAGE MODAL

export const ImageSwiper = ({ imageArr, isZoomIn, zoomInOut }) => (
	(imageArr.length !== 0 && <View style = {detailViews.imageSwiper} >
		<Swiper
			containerStyle = {detailViews.imageSwiper}
			loop = {true}>
			{ModalWrapper(imageArr, isZoomIn, zoomInOut)}
		</Swiper>
	</View>)
);

export const ModalWrapper = (IMG, isZoomIn, zoomInOut) => {
	const views = [];
	for (let i = 0; i < IMG.length; i++) {
		views.push(<View key={`getViews-${i}`}
			style = {detailViews.imageSwiper}>
			<Modal animationType='none'
				transparent={true}
				visible={isZoomIn}
				onRequestClose={() => {} }>
				<View style = {detailViews.zoomInSwiper}>
					<ModalSwiper IMG = {IMG} />
					<CloseButton onPress = {() => zoomInOut()} />
				</View>
			</Modal>
			<TouchableOpacity
				style = {detailViews.imageSwiper}
				onPress = {zoomInOut(true)}>
				<SwiperImage
					image = {IMG[i]}
					id = {`i-${i}`} />
			</TouchableOpacity>
		</View>);
	}
	return views;
};

export const CloseButton = ({ onPress }) => (
	<TouchableOpacity
		style = {detailViews.closeButton}
		onPress={() => onPress()}>
		<Text style = {detailViews.closeButtonText}>{TEXT.close}</Text>
	</TouchableOpacity>
);

export const ModalSwiper = ({ IMG, height = '100%', onPressed = () => {} }) => {
	const views = [];
	IMG.map((image, i) => {
		views.push(<TouchableOpacity
			onPress = {() => onPressed()}
			key = {`SI-${image}-${i}`}>
			<SwiperImage
				image = {image}
				key = {`SI-${image}-${i}`}
				id = {`IMG-${image}-${i}`}/></TouchableOpacity>
		);
	});

	return <View style = {{ height: height }}>
		<Swiper containerStyle = {detailViews.modalSwiper}
			loop = {true}>
			{views}
		</Swiper>
	</View>;
};

export const SwiperImage = ({ image, id = 0 }) => (
	<Image
		key = {id}
		style = {detailViews.swiperImage}
		source = {{ uri: image, cache: 'force-cache' }}
		resizeMode = 'contain'>
	</Image>
);

// ======== details

export const DetailEntry = ({ label, value }) => (
	<View style = {detailViews.entryRow} >
		<Text style={detailViews.labelStyle} >{label}</Text>
		<Text style={detailViews.valueStyle}
			onPress = {() => writeToClipboard(value)} >{value}</Text>
	</View>
);

export const JewelryEntry = ({ label, value }) => (
	<View style = {detailViews.entryRow} >
		<Text style={detailViews.jewelryLabel} >{label}</Text>
		<Text style={detailViews.valueStyle}
			onPress = {() => writeToClipboard(value)} >{value}</Text>
	</View>
);

export const PriceBox = ({ label, value }) => (
	<View style ={detailViews.priceBox} >
		<Text style={detailViews.priceLabel}>{label}</Text>
		<Text style={detailViews.priceValue}>{value}</Text>
	</View>
);
