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
    private String timestamp;
    private String initialPrice;

    
    public Auction(Long id, String imageURL, String title, String artist, String description,
            String timestamp, String initialPrice) {
        this.id = id;
        this.imageURL = imageURL;
        this.title = title;
        this.artist = artist;
        this.description = description;
        this.timestamp = timestamp;
        this.initialPrice = initialPrice;
    }

    public Auction(){}
    
    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public String getInitialPrice() {
        return initialPrice;
    }
    public void setInitialPrice(String initialPrice) {
        this.initialPrice = initialPrice;
    }
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
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((artist == null) ? 0 : artist.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((imageURL == null) ? 0 : imageURL.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "Artwork [artist=" + artist + ", id=" + id + ", imageURL=" + imageURL + ", title=" + title
                + ", openseaLink=" + "]";
    };

    
    
}