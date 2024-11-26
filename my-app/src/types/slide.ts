
export interface Slide {
    image: string;
    title: string;
    href: string;
    date: string;
    description: string;
}

export class SlideModel implements Slide {
    image: string;
    title: string;
    href: string;
    date: string;
    description: string;

    constructor(image: string, title: string, href: string, date: string, description: string) {
        this.image = image;
        this.title = title;
        this.href = href;
        this.date = date;
        this.description = description;
    }

}