import React from 'react';

import { Swiper, Modal, Text, TouchableOpacity, View, Image } from 'react-native';
import { TEXT } from '../../../Cortex';
import { detailViews } from '../../results/styling';

export const ImageSwiper = ({ imageArr, isZoomIn, zoomInOut }) => (
	imageArr.length !== 0 &&
	<View style = {detailViews.imageSwiper} >
		<Swiper containerStyle = {detailViews.imageSwiper}
			loop = {true} >
			{ModalWrapper(imageArr, isZoomIn, zoomInOut)}
		</Swiper>
	</View>
);

const ModalWrapper = (IMG, isZoomIn, zoom) => {
	const views = [];
	for (let i = 0; i < IMG.length; i++) {
		views.push(<View key={`getViews-${i}`}
			style = {detailViews.imageSwiper}>
			<Modal animationType='none'
				transparent={true}
				visible={isZoomIn}
				onRequestClose={() => {} }>
				<View style = {detailViews.zoomInSwiper}>
					<View style = {{ height: '90%' }}>
						<Swiper
							containerStyle = {detailViews.modalSwiper}
							loop = {true}>
							<ModalSwiper IMG = {IMG} />
						</Swiper>
					</View>
					<CloseButton onPress = {() => zoom(false)} />
				</View>
			</Modal>
			<TouchableOpacity
				style = {detailViews.imageSwiper}
				onPress = {() => zoom(true)}>
				<SwiperImage image = {IMG[i]} />
			</TouchableOpacity>
		</View>);
	}
	return views;
};

const ModalSwiper = ({ IMG }) => {
	const views = [];

	for (let i = 0; i < IMG.length; i++) {
		views.push(<SwiperImage
			key = {`IMG-${i}`}
			image = {IMG[i]} />
		);
	}
	return views;
};

const SwiperImage = ({ image, key = 0 }) => (
	<Image
		key = {key}
		style = {detailViews.swiperImage}
		source = {{ uri: image, cache: 'force-cache' }}
		resizeMode = 'contain'>
	</Image>
);

const CloseButton = ({ onPress }) => (
	<TouchableOpacity
		style = {detailViews.closeButton}
		onPress={onPress()}>
		<Text style = {detailViews.closeButtonText}>{TEXT.close}</Text>
	</TouchableOpacity>
);

/*
structure jewelry
- image swiper
- title box + price
- detail box

structure loose
- image swiper (if image)
- shape image + title box
- price box
- detail box
 */
