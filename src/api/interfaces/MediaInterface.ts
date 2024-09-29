export interface ImageDetails {
	filename: string;
	name: string;
	mime: string;
	extension: string;
	url: string;
}

export interface UploadResponseInterface {
	id: string;
	title: string;
	url_viewer: string;
	url: string;
	display_url: string;
	width: number;
	height: number;
	size: number;
	time: number;
	expiration: number;
	image: ImageDetails;
	thumb: ImageDetails;
	medium: ImageDetails;
	delete_url: string;
}
