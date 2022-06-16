package com.victorgallery.Auction.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "auction")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String imageURL;
    private String title;
    private String artist;
    private String description;
    private String startTimestamp;
    private String endTimestamp;
    private String initialPrice;

    
    public Auction(Long id, String imageURL, String title, String artist, String description, String startTimestamp,
            String endTimestamp, String initialPrice) {
        this.id = id;
        this.imageURL = imageURL;
        this.title = title;
        this.artist = artist;
        this.description = description;
        this.startTimestamp = startTimestamp;
        this.endTimestamp = endTimestamp;
        this.initialPrice = initialPrice;
    }

    public Auction(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStartTimestamp() {
        return startTimestamp;
    }

    public void setStartTimestamp(String startTimestamp) {
        this.startTimestamp = startTimestamp;
    }

    public String getEndTimestamp() {
        return endTimestamp;
    }

    public void setEndTimestamp(String endTimestamp) {
        this.endTimestamp = endTimestamp;
    }

    public String getInitialPrice() {
        return initialPrice;
    }

    public void setInitialPrice(String initialPrice) {
        this.initialPrice = initialPrice;
    }

    @Override
    public String toString() {
        return "Auction [artist=" + artist + ", description=" + description + ", endTimestamp=" + endTimestamp + ", id="
                + id + ", imageURL=" + imageURL + ", initialPrice=" + initialPrice + ", startTimestamp="
                + startTimestamp + ", title=" + title + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((artist == null) ? 0 : artist.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((endTimestamp == null) ? 0 : endTimestamp.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((imageURL == null) ? 0 : imageURL.hashCode());
        result = prime * result + ((initialPrice == null) ? 0 : initialPrice.hashCode());
        result = prime * result + ((startTimestamp == null) ? 0 : startTimestamp.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
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
        Auction other = (Auction) obj;
        if (artist == null) {
            if (other.artist != null)
                return false;
        } else if (!artist.equals(other.artist))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (endTimestamp == null) {
            if (other.endTimestamp != null)
                return false;
        } else if (!endTimestamp.equals(other.endTimestamp))
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
        if (initialPrice == null) {
            if (other.initialPrice != null)
                return false;
        } else if (!initialPrice.equals(other.initialPrice))
            return false;
        if (startTimestamp == null) {
            if (other.startTimestamp != null)
                return false;
        } else if (!startTimestamp.equals(other.startTimestamp))
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        return true;
    }

    
    
    
}