package unosample.controller.filters;

import java.io.Serializable;

import org.json.JSONException;
import org.json.JSONObject;

public class SongSearchFilter implements Serializable {
    private static final long serialVersionUID = 7731605432119242345L;

    private Long id;
    private String title;

    public SongSearchFilter(String jsonString) throws JSONException {
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
}
