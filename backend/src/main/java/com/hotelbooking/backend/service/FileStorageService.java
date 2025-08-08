// src/main/java/com/hotelbooking/backend/service/FileStorageService.java
package com.hotelbooking.backend.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    void init();
    String save(MultipartFile file);
    Resource load(String filename);
}