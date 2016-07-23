package unosample.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.json.JSONException;
import org.json.JSONObject;

@Entity
public class Song implements Serializable {
    private static final long serialVersionUID = -7561504462510782081L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = false)
    private String title;

    public Song() {
    }
    
    public Song(String jsonString) throws JSONException {
        JSONObject jsonObject = new JSONObject(jsonString);
        id = (jsonObject.has("id")) ? jsonObject.getLong("id") : null;
        title = (jsonObject.has("title")) ? jsonObject.getString("title") : null;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    
    public String toString() {
        JSONObject jsonObject = new JSONObject(this);
        return jsonObject.toString();
    }
}
