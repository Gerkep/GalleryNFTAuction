package com.victorgallery.Auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "artworks")
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String imageURL;
    private String title;
    private String artist;
    private String openseaLink;
    private String description;
    
    public Artwork(Long id, String imageURL, String title, String artist, String openseaLink, String description) {
        this.id = id;
        this.imageURL = imageURL;
        this.title = title;
        this.artist = artist;
        this.openseaLink = openseaLink;
        this.description = description;
    }
    public Artwork(){}
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getImageURL() {
        return imageURL;
    }
    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getArtist() {
        return artist;
    }
    public void setArtist(String artist) {
        this.artist = artist;
    }
    public String getOpenseaLink() {
        return openseaLink;
    }
    public void setOpenseaLink(String openseaLink) {
        this.openseaLink = openseaLink;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((artist == null) ? 0 : artist.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((imageURL == null) ? 0 : imageURL.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((openseaLink == null) ? 0 : openseaLink.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Artwork other = (Artwork) obj;
        if (artist == null) {
            if (other.artist != null)
                return false;
        } else if (!artist.equals(other.artist))
            return false;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (imageURL == null) {
            if (other.imageURL != null)
                return false;
        } else if (!imageURL.equals(other.imageURL))
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (openseaLink == null) {
            if (other.openseaLink != null)
                return false;
        } else if (!openseaLink.equals(other.openseaLink))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Artwork [artist=" + artist + ", id=" + id + ", imageURL=" + imageURL + ", title=" + title
                + ", openseaLink=" + openseaLink + "]";
    };

    
    
}